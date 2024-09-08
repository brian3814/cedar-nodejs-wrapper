const fs = require('node:fs');
const path = require('node:path');
const { spawn, exec } = require('node:child_process');

// config handles cmd arguments and must be imported before server
const config = require('./config');
const server = require('./server');

const CEDAR_BINARY_PATH = path.join(
  __dirname,
  '../cedar-agent/target/release/cedar-agent'
);

class Main {
  constructor() {
    this.nodeServer = server;
    this.cedarServer = null;
  }

  run(config) {
    const nodePort = parseInt(config.nodeport);
    const cedarPort = config.cedarport;

    this.cedarServer = spawn('cargo', ['run', '--', '--port', cedarPort], {
      cwd: path.join(__dirname, '../cedar-agent'),
      detached: true,
      stdio: 'inherit'
    });

    this.nodeServer.listen(nodePort)
  }
}

async function buildCedar() {
  if (!fs.existsSync(CEDAR_BINARY_PATH)) {
    console.log('Cedar-agent executable not found, attempt to build it');

    try{
      await exec('cargo build --release', { 
        cwd: path.join(__dirname, '../cedar-agent'),
        encoding: 'utf8',
        stdio: 'ignore'
      });

      console.log('Cedar-agent built successfully');
    } catch(err) {
      console.error(err);
      throw err;
    }
  }
}

const main = new Main();
exports = module.exports = main;

if (require.main === module) {
  buildCedar();
  main.run(config);

  process.on('SIGTERM', () => {
    main.cedarServer.kill();
  });
}
