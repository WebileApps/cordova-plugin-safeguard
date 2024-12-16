#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Read the current version from package.json
const packageJson = require('../package.json');
const version = packageJson.version;

// Update plugin.xml version
const pluginXmlPath = path.join(__dirname, '..', 'plugin.xml');
const pluginXml = fs.readFileSync(pluginXmlPath, 'utf8');

// Only update the version attribute in the plugin tag
const updatedPluginXml = pluginXml.replace(
    /(<plugin[^>]*\sversion=")[^"]*(")/,
    `$1${version}$2`
);

fs.writeFileSync(pluginXmlPath, updatedPluginXml);

console.log(`Updated plugin.xml version to ${version}`);
