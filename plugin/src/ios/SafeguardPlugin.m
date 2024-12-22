#import <UIKit/UIKit.h>
#import "SafeguardPlugin.h"
#import <SafeGuardiOS/SGSecurityConfiguration.h>

@implementation SafeguardPlugin

- (void)pluginInitialize {
    [super pluginInitialize];

    [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(onBecomeActive) name:UIApplicationDidBecomeActiveNotification object:nil];
    
    // Get preferences from config.xml
    SGSecurityConfiguration *config = [[SGSecurityConfiguration alloc] init];
    
    config.rootDetectionLevel = [self getSecurityLevelFromPreferences:@"root_check_state" defaultValue:SGSecurityLevelError];
    config.developerOptionsLevel = [self getSecurityLevelFromPreferences:@"developer_options_check_state" defaultValue:SGSecurityLevelWarning];
    config.signatureVerificationLevel = [self getSecurityLevelFromPreferences:@"malware_check_state" defaultValue:SGSecurityLevelWarning];
    config.networkSecurityLevel = [self getSecurityLevelFromPreferences:@"network_security_check_state" defaultValue:SGSecurityLevelWarning];
    config.screenSharingLevel = [self getSecurityLevelFromPreferences:@"screen_sharing_check_state" defaultValue:SGSecurityLevelWarning];
    config.spoofingLevel = [self getSecurityLevelFromPreferences:@"app_spoofing_check_state" defaultValue:SGSecurityLevelWarning];
    config.reverseEngineerLevel = [self getSecurityLevelFromPreferences:@"tampering_check_state" defaultValue:SGSecurityLevelWarning];
    config.keyLoggersLevel = [self getSecurityLevelFromPreferences:@"keylogger_check_state" defaultValue:SGSecurityLevelWarning];
    config.audioCallLevel = [self getSecurityLevelFromPreferences:@"ongoing_call_check_state" defaultValue:SGSecurityLevelWarning];
    config.expectedBundleIdentifier = [self.commandDelegate.settings objectForKey:@"expected_package_name"];
    config.expectedSignature = [self.commandDelegate.settings objectForKey:@"expected_certificate_hash"];
 
    self.securityChecker = [[SGSecurityChecker alloc] initWithConfiguration:config];
    
    // Set up alert handler
    self.securityChecker.alertHandler = ^(NSString *title, NSString *message, SGSecurityLevel level, void(^completion)(BOOL shouldQuit)) {
        dispatch_async(dispatch_get_main_queue(), ^{
            UIAlertController *alert = [UIAlertController alertControllerWithTitle:title
                                                                         message:message
                                                                  preferredStyle:UIAlertControllerStyleAlert];
            
            NSString *buttonTitle = (level == SGSecurityLevelError) ? @"Quit" : @"Continue Anyway";
            UIAlertAction *action = [UIAlertAction actionWithTitle:buttonTitle
                                                           style:UIAlertActionStyleDefault
                                                         handler:^(UIAlertAction * _Nonnull action) {
                completion(level == SGSecurityLevelError);
            }];
            
            [alert addAction:action];
            
            UIViewController *rootViewController = [UIApplication sharedApplication].keyWindow.rootViewController;
            [rootViewController presentViewController:alert animated:YES completion:nil];
        });
    };

    [self.securityChecker performAllSecurityChecks];
}

- (SGSecurityLevel)getSecurityLevelFromPreferences:(NSString *)preferenceName defaultValue:(SGSecurityLevel)defaultValue {
    NSString *value = [self.commandDelegate.settings objectForKey:preferenceName];
    if ([value isEqualToString:@"ERROR"]) {
        return SGSecurityLevelError;
    } else if ([value isEqualToString:@"WARNING"]) {
        return SGSecurityLevelWarning;
    } else if ([value isEqualToString:@"DISABLE"]) {
        return SGSecurityLevelDisable;
    }
    return defaultValue;
}

#pragma mark - Plugin Methods

- (void)checkRoot:(CDVInvokedUrlCommand*)command {
    [self.commandDelegate runInBackground:^{
        [self.securityChecker checkRoot];
//        [self handleSecurityCheckResult:result checkName:@"Root Access Check" command:command];
    }];
}

- (void)checkDeveloperOptions:(CDVInvokedUrlCommand*)command {
    [self.commandDelegate runInBackground:^{
        [self.securityChecker checkDeveloperOptions];
//        [self handleSecurityCheckResult:result checkName:@"Developer Options Check" command:command];
    }];
}

- (void)checkMalware:(CDVInvokedUrlCommand*)command {
    [self.commandDelegate runInBackground:^{
        [self.securityChecker checkSignature];
//        [self handleSecurityCheckResult:result checkName:@"Malware Check" command:command];
    }];
}

- (void)checkNetwork:(CDVInvokedUrlCommand*)command {
    [self.commandDelegate runInBackground:^{
        [self.securityChecker checkNetworkSecurity];
//        [self handleSecurityCheckResult:result checkName:@"Network Security Check" command:command];
    }];
}

- (void)checkScreenMirroring:(CDVInvokedUrlCommand*)command {
    [self.commandDelegate runInBackground:^{
        [self.securityChecker checkScreenSharing];
//        [self handleSecurityCheckResult:result checkName:@"Screen Mirroring Check" command:command];
    }];
}

- (void)checkAppSpoofing:(CDVInvokedUrlCommand*)command {
    [self.commandDelegate runInBackground:^{
        [self.securityChecker checkSpoofing];
    }];
}

- (void)checkKeyLogger:(CDVInvokedUrlCommand*)command {
    [self.commandDelegate runInBackground:^{
        // Implementation pending
//        [self handleSecurityCheckResult:SGSecurityCheckResultSuccess checkName:@"Keylogger Check" command:command];
    }];
}

- (void)checkAll:(CDVInvokedUrlCommand*)command {
    [self.commandDelegate runInBackground:^{
        [self.securityChecker performAllSecurityChecks];
        CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
        [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
    }];
}

- (void)onBecomeActive {
    [self.securityChecker performAllSecurityChecks];
}

- (void)onReset {
    [super onReset];
    [self.securityChecker cleanup];
}

@end
