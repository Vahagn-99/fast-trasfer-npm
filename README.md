# Transfer-Fast NPM Package

## Overview

Transfer-Fast is a simple NPM package that allows you to configure and initiate file transfers easily. When you run the package, it will add two files (`fast-transfer.json` and `fast-transfer.js`) to your project directory. The JSON file is used to configure the file transfer, while the JS file executes the transfer based on the given configuration.

## Installation

To install the package, use the following command:

```sh
npm install transfer-fast
```

## After installation, execute the transfer-fast command:

```sh
npx transfer-fast
```

## This will add fast-transfer.json and fast-transfer.js to your current project directory.


## Configuration
The `fast-transfer.json` file contains the configuration for your file transfer. Here's what the default file looks like:

```sh
{
    "user": "username",
    "ip": "127.0.0.1",
    "projectPath": "/path/to/project",
    "sourceFolder": "src",
    "privateKey": "~/path/to/private-key.pe"
}
```

You'll need to edit this file with your details:

- `user`: The username on the destination machine.
- `ip`: The IP address of the destination machine.
- `projectPath`: The path on the destination machine where the files should be transferred to.
- `sourceFolder`: The path to the folder that you want to transfer, relative to the current project directory.
- `privateKey`: The path to your private key for SSH authentication. You can use `~` to represent your home directory.

## Usage

Once your `fast-transfer.json` file has been configured, you can execute the transfer by running the `transfer-fast.js` script.

```shell
node transfer-fast.js
```

If successful, the script will transfer the files specified in your `sourceFolder` to the `projectPath` on the destination machine.


## Example

Let's say you want to transfer all files in the `src` directory of your project to a project directory on a remote server. Your `fast-transfer.json` file might look like this:

```json
{
    "user": "myuser",
    "ip": "192.168.1.100",
    "projectPath": "/var/www/myproject",
    "sourceFolder": "src",
    "privateKey": "~/.ssh/id_rsa"
}
```

After configuring the `fast-transfer.json` file as shown above, you can initiate the file transfer by running the following command:

```shell
node transfer-fast.js
```

This will execute the transfer-fast.js script and transfer all files in the src directory to the /var/www/myproject directory on the server at 192.168.1.100.

## Contributing

Contributions to Transfer-Fast are always welcome! If you have a suggestion, bug report, or wish to contribute to the code, please feel free to open an issue or submit a pull request on our [GitHub page](https://github.com/your-username/transfer-fast).

We appreciate your help in improving Transfer-Fast and making it even better!
