const exec = require('child_process').exec;
const path = require('path');
const fs = require('fs');
const os = require('os');
const chalk = require('chalk');

// Path to the configuration file
const configPath = path.join(__dirname, 'transfer-fast.json');

// Check if the configuration file exists
if (!fs.existsSync(configPath)) {
    console.error(chalk.red('Configuration file (transfer-fast.json) not found.'));
    process.exit(1);
}

// Read and parse the configuration file
let config;
try {
    config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
} catch (err) {
    console.error(chalk.red('Error parsing configuration file.'));
    process.exit(1);
}

// Extract required properties from the configuration
const { user, ip, projectPath, sourceFolder, privateKey } = config;

// Validate the required properties
if (!user || !ip || !projectPath || !sourceFolder || !privateKey) {
    console.error(chalk.red('Invalid configuration file. Please provide user, ip, projectPath, sourceFolder, and privateKey in the transfer-fast.json file.'));
    process.exit(1);
}

// Expand the tilde (~) in the private key path to the user's home directory
const expandedPrivateKey = privateKey.replace(/^~(?=$|\/|\\)/, os.homedir());

// Construct the source path using the current directory and source folder
const sourcePath = path.join(__dirname, sourceFolder);

// Construct the destination in the format "user@ip:projectPath"
const destination = `${user}@${ip}:${projectPath}`;

// Construct the rsync command with the appropriate options and parameters
const command = `rsync -avz -e "ssh -i ${expandedPrivateKey}" --delete ${sourcePath}/ ${destination}`;

// Execute the rsync command as a child process
const child = exec(command);

// Handle the stdout data event (output from rsync)
child.stdout.on('data', (data) => {
    console.log(chalk.green(data)); // colorize rsync stdout with green
});

// Handle the stderr data event (error output from rsync)
child.stderr.on('data', (data) => {
    console.error(chalk.red(data)); // colorize rsync stderr with red
});

// Handle the exit event of the child process
child.on('exit', (code) => {
    if (code === 0) {
        console.log(chalk.blue('Transfer completed successfully.'));
    } else {
        console.log(chalk.red('Transfer failed with exit code ' + code));
    }
});
