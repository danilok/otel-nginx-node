'use strict';

const path = require('path')
const api = require('@opentelemetry/api');
const tracer = require('./tracer')(path.parse(__filename).name);
// eslint-disable-next-line import/order
const http = require('http');

/** Starts a HTTP server that receives requests on sample server port. */
function startServer(port) {
  // Creates a server
  const server = http.createServer(handleRequestSrvA);
  // Starts the server
  server.listen(port, (err) => {
    if (err) {
      throw err;
    }
    console.log(`Node HTTP listening on ${port}`);
  });
}

/** A function which handles requests and send response. */
function handleRequestSrvA(request, response) {
  const currentSpan = api.trace.getSpan(api.context.active());
  // console.log('Service A Headers',request.rawHeaders)
  // let ctx = api.context.active()
  // console.log('Service A Context', ctx)
  // let ctxKey = api.createContextKey('OpenTelemetry SDK Context Key RPC_METADATA');
  // console.log('Context RPC_METADATA', ctx.getValue(ctxKey));
  // ctxKey = api.createContextKey('OpenTelemetry Context Key SPAN');
  // console.log('Context SPAN', ctx.getValue(ctxKey));
  // display traceid in the terminal
  // console.log(`traceid: ${currentSpan.spanContext().traceId}`);
  const span = tracer.startSpan('handleRequestSrvA', {
    kind: 1, // server
    attributes: { key: 'value-serviceA' },
  });
  // console.log(`Service A traceid: ${span.spanContext().traceId}`);
  // Annotate our span to capture metadata about the operation
  span.addEvent('invoking handleRequestSrvA');

  const body = [];
  request.on('error', (err) => console.log(err));
  request.on('data', (chunk) => body.push(chunk));
  request.on('end', () => {
    // send request to service-B
    http.get({
      // host: '0.0.0.0',   // without proxy
      // port: 8091,        // without proxy
      host: 'proxy',
      port: 80,
      path: '/srv-b',
    }, (res) => {
      const body = [];
      res.on('data', (chunk) => body.push(chunk));
      res.on('end', () => {
        console.log(body.toString());
        span.end();
        response.end('Done!')
      });
    });
  });
}

startServer(8090);

module.exports = startServer
