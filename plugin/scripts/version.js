#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Read the current version from package.json
const packageJson = require('../package.json');
const version = packageJson.version;

// Update plugin.xml version
const pluginXmlPath = path.join(__dirname, '..', 'plugin.xml');
const pluginXml = fs.readFileSync(pluginXmlPath, 'utf8');
const updatedPluginXml = pluginXml.replace(
    /version="[^"]+"/,
    `version="${version}"`
);
fs.writeFileSync(pluginXmlPath, updatedPluginXml);

console.log(`Updated plugin.xml version to ${version}`);
