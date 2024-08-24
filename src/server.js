const http = require('http');
const httpProxy = require('http-proxy');

const express = require('express');
const morgan  = require('morgan');

const config = require('./config');

// server setup
const app = express();
const server = http.createServer(app);
const cedarProxy = httpProxy.createProxyServer({
  target: `http://localhost:${config.cedarport}`
});

app.use(morgan('combined'));

// endpoints
app.all('/rapidoc*', (req, res) => {
  cedarProxy.web(req, res);
});

app.use(express.json());

app.get('/', (req, res)=>{
  res.send([]);
});

app.all('/*', (req, res) => {
  cedarProxy.web(req, res);
});

module.exports = server;