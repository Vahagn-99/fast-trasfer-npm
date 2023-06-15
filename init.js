#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

// Parse command line arguments
const args = process.argv.slice(2);
const shouldModifyConfig = args.includes('-p');

// Define the paths to the files in your package
const packageJsonPath = path.resolve(__dirname, 'transfer-fast.json');
const packageIndexPath = path.resolve(__dirname, 'transfer-fast.js');

// Define the paths where the files will be copied to (the user's project root)
const projectDirectory = process.cwd();
const projectJsonPath = path.resolve(projectDirectory, 'transfer-fast.json');
const projectIndexPath = path.resolve(projectDirectory, 'transfer-fast.js');

try {
    fs.copyFileSync(packageIndexPath, projectIndexPath);

    let config = fs.readFileSync(packageJsonPath, 'utf8');
    config = JSON.parse(config);

    if (shouldModifyConfig) {
        // Modify the config here according to your needs
        // For example:
        // config.someField = "Some new value";
    }

    fs.writeFileSync(projectJsonPath, JSON.stringify(config, null, 2));

    console.log(`transfer-fast files have been added to your project directory:
  - ${projectJsonPath}
  - ${projectIndexPath}`);
} catch (error) {
    console.error('An error occurred while adding the files:', error);
}
