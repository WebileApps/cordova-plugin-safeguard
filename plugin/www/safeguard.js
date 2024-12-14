var exec = require('cordova/exec');

var SecurityChecker = {
    checkSecurity: function(successCallback, errorCallback) {
        exec(successCallback, errorCallback, 'Safeguard', 'checkSecurity', []);
    },
    
    checkRoot: function(successCallback, errorCallback) {
        exec(successCallback, errorCallback, 'Safeguard', 'checkRoot', []);
    },
    
    checkDeveloperOptions: function(successCallback, errorCallback) {
        exec(successCallback, errorCallback, 'Safeguard', 'checkDeveloperOptions', []);
    },
    
    checkMalware: function(successCallback, errorCallback) {
        exec(successCallback, errorCallback, 'Safeguard', 'checkMalware', []);
    },
    
    checkNetwork: function(successCallback, errorCallback) {
        exec(successCallback, errorCallback, 'Safeguard', 'checkNetwork', []);
    },
    
    checkScreenMirroring: function(successCallback, errorCallback) {
        exec(successCallback, errorCallback, 'Safeguard', 'checkScreenMirroring', []);
    },
    
    checkApplicationSpoofing: function(successCallback, errorCallback) {
        exec(successCallback, errorCallback, 'Safeguard', 'checkAppSpoofing', []);
    },
    
    checkKeyLogger: function(successCallback, errorCallback) {
        exec(successCallback, errorCallback, 'Safeguard', 'checkKeyLogger', []);
    }
};

module.exports = SecurityChecker;
