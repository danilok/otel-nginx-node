'use strict';

const path = require('path')
const api = require('@opentelemetry/api');
const tracer = require('./tracer')(path.parse(__filename).name);
// eslint-disable-next-line import/order
const http = require('http');

/** Starts a HTTP server that receives requests on sample server port. */
function startServer(port) {
  // Creates a server
  const server = http.createServer(handleRequestSrvB);
  // Starts the server
  server.listen(port, (err) => {
    if (err) {
      throw err;
    }
    console.log(`Node HTTP listening on ${port}`);
  });
}

/** A function which handles requests and send response. */
function handleRequestSrvB(request, response) {
  // console.log('Service B Headers',request.rawHeaders)
  // let ctx = api.context.active()
  // console.log('Service B Context', ctx)
  // let ctxKey = api.createContextKey('OpenTelemetry SDK Context Key RPC_METADATA');
  // console.log('Context RPC_METADATA', ctx.getValue(ctxKey));
  // ctxKey = api.createContextKey('OpenTelemetry Context Key SPAN');
  // console.log('Context SPAN', ctx.getValue(ctxKey));
  
  // display traceid in the terminal
  // const currentSpan = api.trace.getSpan(api.context.active());
  // console.log(`traceid: ${currentSpan.spanContext().traceId}`);
  const span = tracer.startSpan('handleRequestSrvB', {
    kind: 1, // server
    attributes: { hello: 'world' },
  });
  // console.log(`Service B traceid: ${span.spanContext().traceId}`);
  // Annotate our span to capture metadata about the operation
  span.addEvent('invoking handleRequestSrvB');

  const body = [];
  request.on('error', (err) => console.log(err));
  request.on('data', (chunk) => body.push(chunk));
  request.on('end', () => {
    // deliberately sleeping to mock some action.
    setTimeout(() => {
      http.get({
        host: 'proxy',
        port: 80,
        path: '/backend',
      }, (res) => {
        const body = [];
        console.log(`statusCode: ${res.statusCode}`);
        res.on('data', (chunk) => body.push(chunk));
        res.on('end', () => {
          console.log(body.toString());
          response.end('Done Backend Call!')
        });
      });
      span.end();
      response.end('Hello From Service B!');
    }, 2000);
  });
}

startServer(8091);

module.exports = startServer
