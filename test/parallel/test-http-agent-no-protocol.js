'use strict';
const common = require('../common');
const http = require('http');
const url = require('url');

const server = http.createServer(common.mustCall((req, res) => {
  res.end();
})).listen(0, '127.0.0.1', common.mustCall(() => {
  const opts = url.parse(`http://127.0.0.1:${server.address().port}/`);

  // remove the `protocol` field… the `http` module should fall back
  // to "http:", as defined by the global, default `http.Agent` instance.
  opts.agent = new http.Agent();
  opts.agent.protocol = null;

  http.get(opts, common.mustCall((res) => {
    res.resume();
    server.close();
  }));
}));
