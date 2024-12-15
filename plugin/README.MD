# Cordova Plugin Safeguard

A Cordova plugin for comprehensive security checks and device integrity verification on Android devices.

## Features

- Root Detection
- Developer Options Detection
- Malware and Tampering Detection
- Network Security Checks
- Screen Mirroring Detection
- Application Spoofing Detection
- Keylogger Detection

## Installation

```bash
cordova plugin add cordova-plugin-safeguard
```

Or install directly from GitHub:

```bash
cordova plugin add https://github.com/webileapps/cordova-plugin-safeguard.git
```

## Configuration

Add preferences to your `config.xml` to customize security check behaviors:

```xml
<preference name="ROOT_CHECK_STATE" value="ERROR" />
<preference name="DEVELOPER_OPTIONS_CHECK_STATE" value="WARNING" />
<preference name="MALWARE_CHECK_STATE" value="WARNING" />
<preference name="TAMPERING_CHECK_STATE" value="WARNING" />
<preference name="NETWORK_SECURITY_CHECK_STATE" value="WARNING" />
<preference name="SCREEN_SHARING_CHECK_STATE" value="WARNING" />
<preference name="APP_SPOOFING_CHECK_STATE" value="WARNING" />
<preference name="KEYLOGGER_CHECK_STATE" value="WARNING" />
<preference name="EXPECTED_PACKAGE_NAME" value="com.your.package.name" />
```

Each security check can be configured with one of these states:
- `ERROR`: Blocks app usage when the check fails
- `WARNING`: Shows a warning but allows continuing
- `DISABLED`: Skip the check entirely

## Usage

### JavaScript API

```javascript
// Run all security checks
Safeguard.checkAll(
    function(success) {
        console.log('All security checks passed');
    },
    function(error) {
        console.error('Security check failed:', error);
    }
);

// Individual checks
Safeguard.checkRoot(successCallback, errorCallback);
Safeguard.checkDeveloperOptions(successCallback, errorCallback);
Safeguard.checkMalware(successCallback, errorCallback);
Safeguard.checkNetwork(successCallback, errorCallback);
Safeguard.checkScreenMirroring(successCallback, errorCallback);
Safeguard.checkApplicationSpoofing(successCallback, errorCallback);
Safeguard.checkKeyLogger(successCallback, errorCallback);
```

### Automatic Checks

The plugin automatically performs security checks at these times:
1. When the app starts
2. When the activity starts
3. When the app resumes from background

### Error Handling

The error callback receives a JSON object with:
```javascript
{
    "title": "Security Check Name",
    "message": "Detailed message about the security issue",
    "type": "error" // or "warning"
}
```

## Sample App

A sample application demonstrating all features is available in the `sample` directory. To run it:

```bash
cd sample
npm install
cordova platform add android
cordova run android
```

## Requirements

- Cordova >= 9.0.0
- Android >= 9.0.0 (API Level 28)
- Gradle >= 7.0.0

## License

MIT License - see LICENSE file for details

## Support

For bugs, questions, and discussions please use the [GitHub Issues](https://github.com/webileapps/cordova-plugin-safeguard/issues).

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## Development

To set up the development environment:

1. Clone the repository
```bash
git clone https://github.com/webileapps/cordova-plugin-safeguard.git
cd cordova-plugin-safeguard
```

2. Install dependencies
```bash
cd plugin
npm install
```

3. Make your changes and test using the sample app
```bash
cd ../sample
npm install
cordova platform add android
cordova run android
```

## Publishing

To publish a new version:

1. Update version
```bash
cd plugin
npm version patch  # or minor/major
```

2. Publish to npm
```bash
npm publish
```

This will automatically:
- Update versions in package.json and plugin.xml
- Create git tags
- Publish to npm registry