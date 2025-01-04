#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Files/directories to exclude from npm package
const excludeList = [
    'sample',
    '.git',
    '.gitignore',
    'node_modules',
    'scripts'
];

// Check if files exist
const requiredFiles = [
    'plugin.xml',
    'www/safeguard.js',
    'src/android/SafeguardPlugin.java',
    'src/android/build.gradle',
    'package.json'
];

for (const file of requiredFiles) {
    const filePath = path.join(__dirname, '..', file);
    if (!fs.existsSync(filePath)) {
        console.error(`Error: Required file ${file} is missing`);
        process.exit(1);
    }
}

// Create .npmignore if it doesn't exist
const npmignorePath = path.join(__dirname, '..', '.npmignore');
if (!fs.existsSync(npmignorePath)) {
    fs.writeFileSync(npmignorePath, excludeList.join('\n'));
    console.log('Created .npmignore file');
}

console.log('Pre-publish checks completed successfully');
