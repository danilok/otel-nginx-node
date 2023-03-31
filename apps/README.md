# Instrumented NodeJS clients

## Details

There are 3 different apps:
- Client: Start communication and create the first span
- Service A: Receives request from client and sends request to Service B
- Service B: Receives request from service A and sends request to Backend (Java) which returns a `Not Found` error.

The tracers associated to each app are slightly different for testing purposes and better understanding of OpenTelemetry tracer.
- Client: `NodeTracerProvider` without node auto instrumentation
- Service A: `NodeTracerProvider` with node auto instrumentation
- Service B: `NodeSDK` with node auto instrumentation

### Service B
This app has two codes, one using `NodeSDK` which is configured to be executed by `npm start` script and another very similar to Service A.

## Command used to install dependencies
```bash
npm i @opentelemetry/api @opentelemetry/instrumentation @opentelemetry/instrumentation-http @opentelemetry/resources \
  @opentelemetry/semantic-conventions @opentelemetry/exporter-trace-otlp-http @opentelemetry/sdk-node @opentelemetry/sdk-trace-node \
  @opentelemetry/sdk-trace-base @opentelemetry/auto-instrumentations-node
```