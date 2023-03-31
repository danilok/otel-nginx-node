'use strict';

const path = require('path')
const api = require('@opentelemetry/api');
const tracer = require('./tracer')(path.parse(__filename).name);
// eslint-disable-next-line import/order
const http = require('http');

/** A function which makes requests and handles response. */
function makeRequest() {
  // span corresponds to outgoing requests. Here, we have manually created
  // the span, which is created to track work that happens outside of the
  // request lifecycle entirely.
  const span = tracer.startSpan('Client Request');
  // console.log('Client', api.context.active()) // empty context
  api.context.with(api.trace.setSpan(api.context.active(), span), () => {
    // console.log('Client Span',api.context.active()) // Initial span context
    // console.log('Client SpanContext',span.spanContext())
    http.get({
      // host: '0.0.0.0', // without proxy
      // port: 8090,      // without proxy
      host: 'proxy',
      port: 80,
      path: '/srv-a',
    }, (response) => {
      const body = [];
      response.on('data', (chunk) => body.push(chunk));
      response.on('end', () => {
        console.log(body.toString());
        span.end();

      console.log('Sleeping 5 seconds before shutdown to ensure all records are flushed.');
      setTimeout(() => { console.log('Client completed.'); }, 5000);
      });
    });
  });

  // The process must live for at least the interval past any traces that
  // must be exported, or some risk being lost if they are recorded after the
  // last export.
}

console.log('Sleeping 5 seconds before making request to ensure all services are up.');
setTimeout(makeRequest ,5000);
