#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Get the current version
const packageJson = require('../package.json');
const version = packageJson.version;

// Create a git tag
try {
    execSync(`git tag v${version}`);
    execSync('git push --tags');
    console.log(`Created and pushed git tag v${version}`);
} catch (error) {
    console.warn('Warning: Could not create git tag:', error.message);
}

console.log('Post-publish tasks completed successfully');
