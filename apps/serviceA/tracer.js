'use strict';

const opentelemetry = require('@opentelemetry/api');
const { ConsoleSpanExporter, SimpleSpanProcessor } = require('@opentelemetry/sdk-trace-base')
const { NodeTracerProvider } = require('@opentelemetry/sdk-trace-node');

const { OTLPTraceExporter } = require('@opentelemetry/exporter-trace-otlp-http')
const { Resource } = require('@opentelemetry/resources')
const { SemanticResourceAttributes } = require('@opentelemetry/semantic-conventions')

const { registerInstrumentations } = require('@opentelemetry/instrumentation')
const { HttpInstrumentation } = require('@opentelemetry/instrumentation-http')

module.exports = (serviceName) => {
  // for debug purpose
  // opentelemetry.diag.setLogger(new opentelemetry.DiagConsoleLogger(), opentelemetry.DiagLogLevel.INFO);

  const collectorOptions = {
    url: 'http://collector:4318/v1/traces',
    headers: {
      foo: 'barA'
    }, // an optional object containing custom headers to be sent with each request will only work with http
  };
  const exporter = new OTLPTraceExporter(collectorOptions);

  const provider = new NodeTracerProvider({
    resource: new Resource({
      [SemanticResourceAttributes.SERVICE_NAME]: serviceName,
    }),
  });
  provider.addSpanProcessor(new SimpleSpanProcessor(exporter));
  // provider.addSpanProcessor(new SimpleSpanProcessor(new ConsoleSpanExporter()));
  provider.register();

  // register and load instrumentation and old plugins - old plugins will be loaded automatically as previously
  // but instrumentations needs to be added
  registerInstrumentations({
    instrumentations: [
      new HttpInstrumentation({
          requestHook: (span, request) => {
            span.setAttribute("custom request hook attribute", "request from service A");
          },
      }),
    ],
  });

  return opentelemetry.trace.getTracer(serviceName);
};
