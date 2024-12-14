var exec = require('cordova/exec');

var SecurityChecker = {
    checkSecurity: function(successCallback, errorCallback) {
        exec(successCallback, errorCallback, 'SecurityChecker', 'checkSecurity', []);
    },
    
    checkRoot: function(successCallback, errorCallback) {
        exec(successCallback, errorCallback, 'SecurityChecker', 'checkRoot', []);
    },
    
    checkDeveloperOptions: function(successCallback, errorCallback) {
        exec(successCallback, errorCallback, 'SecurityChecker', 'checkDeveloperOptions', []);
    },
    
    checkMalware: function(successCallback, errorCallback) {
        exec(successCallback, errorCallback, 'SecurityChecker', 'checkMalware', []);
    },
    
    checkNetwork: function(successCallback, errorCallback) {
        exec(successCallback, errorCallback, 'SecurityChecker', 'checkNetwork', []);
    },
    
    checkScreenMirroring: function(successCallback, errorCallback) {
        exec(successCallback, errorCallback, 'SecurityChecker', 'checkScreenMirroring', []);
    },
    
    checkApplicationSpoofing: function(successCallback, errorCallback) {
        exec(successCallback, errorCallback, 'SecurityChecker', 'checkAppSpoofing', []);
    },
    
    checkKeyLogger: function(successCallback, errorCallback) {
        exec(successCallback, errorCallback, 'SecurityChecker', 'checkKeyLogger', []);
    }
};

module.exports = SecurityChecker;
