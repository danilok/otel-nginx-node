# OpenTelemetry with Nginx and Node

This repository is a functional case of OpenTelemetry in a context with Nginx as a proxy server and nodes developed with NodeJS and Java.

The node clients was based on code of jonchurch [otel-issues repository](https://github.com/jonchurch/otel-issues).

And helpful references are:
- [NGINX Tutorial: How to Use OpenTelemetry Tracing to Understand Your Microservices](https://www.nginx.com/blog/nginx-tutorial-opentelemetry-tracing-understand-microservices/)
- [Learn how to instrument nginx with OpenTelemetry](https://opentelemetry.io/blog/2022/instrument-nginx/)

## Create beforehand docket network

```sh
docker network create otel-network
```

## Install NodeJS clients dependencies

```sh
cd apps
npm i
```

### Run

On root folder:

```sh
docker compose up -d
```

### Stop

```sh
docker compose down
```