document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Setup button click handlers
    document.getElementById('checkRoot').addEventListener('click', checkRoot);
    document.getElementById('checkDeveloper').addEventListener('click', checkDeveloper);
    document.getElementById('checkNetwork').addEventListener('click', checkNetwork);
    document.getElementById('checkMalware').addEventListener('click', checkMalware);
    document.getElementById('checkScreen').addEventListener('click', checkScreen);
    document.getElementById('checkSpoofing').addEventListener('click', checkSpoofing);
    document.getElementById('checkKeyLogger').addEventListener('click', checkKeyLogger);
    document.getElementById('checkAll').addEventListener('click', checkAll);
}

function updateButtonState(buttonId, result) {
    const button = document.getElementById(buttonId);
    button.classList.remove('success', 'warning', 'error');
    
    if (result.includes('passed')) {
        button.classList.add('success');
    } else if (result.includes('Warning')) {
        button.classList.add('warning');
    } else {
        button.classList.add('error');
    }
}

function checkRoot() {
    Safeguard.checkRoot(
        function(result) {
            updateButtonState('checkRoot', result);
        },
        function(error) {
            console.error('Root check failed:', error);
            updateButtonState('checkRoot', error);
        }
    );
}

function checkDeveloper() {
    Safeguard.checkDeveloperOptions(
        function(result) {
            updateButtonState('checkDeveloper', result);
        },
        function(error) {
            console.error('Developer options check failed:', error);
            updateButtonState('checkDeveloper', error);
        }
    );
}

function checkNetwork() {
    Safeguard.checkNetwork(
        function(result) {
            updateButtonState('checkNetwork', result);
        },
        function(error) {
            console.error('Network security check failed:', error);
            updateButtonState('checkNetwork', error);
        }
    );
}

function checkMalware() {
    Safeguard.checkMalware(
        function(result) {
            updateButtonState('checkMalware', result);
        },
        function(error) {
            console.error('Malware check failed:', error);
            updateButtonState('checkMalware', error);
        }
    );
}

function checkScreen() {
    Safeguard.checkScreenMirroring(
        function(result) {
            updateButtonState('checkScreen', result);
        },
        function(error) {
            console.error('Screen mirroring check failed:', error);
            updateButtonState('checkScreen', error);
        }
    );
}

function checkSpoofing() {
    Safeguard.checkApplicationSpoofing(
        function(result) {
            updateButtonState('checkSpoofing', result);
        },
        function(error) {
            console.error('App spoofing check failed:', error);
            updateButtonState('checkSpoofing', error);
        }
    );
}

function checkKeyLogger() {
    Safeguard.checkKeyLogger(
        function(result) {
            updateButtonState('checkKeyLogger', result);
        },
        function(error) {
            console.error('Key logger check failed:', error);
            updateButtonState('checkKeyLogger', error);
        }
    );
}

function checkAll() {
    Safeguard.checkAll(
        function(result) {
            updateButtonState('checkAll', result);
        },
        function(error) {
            console.error('All checks failed:', error);
            updateButtonState('checkAll', error);
        }
    );
}
