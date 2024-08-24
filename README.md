# cedar-nodejs-wrapper

This is a node.js-based wrapper around [cedar-agent](https://github.com/permitio/cedar-agent) to expose cedar functions through REST API.

## How to use

Before starting, make sure that Rust and Cargo are installed. If not installed, visit the [official Rust installation page](https://www.rust-lang.org/tools/install) to install.

Of course, node must be installed as well.

After all prerequisites have been installed, execut below commands to start up the server.

```
npm install
node src/index.js
```

You may assign specific ports for the wrapped-up cedar server and node server through cmd arguments.

```
node install
node src/index.js --nodeport 3002 --cedarport 3003
```