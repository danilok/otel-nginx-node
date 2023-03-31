# OpenTelemetry with Nginx and Node

This repository is a functional case of OpenTelemetry in a context with Nginx as a proxy server and nodes developed with NodeJS and Java.

The node clients was based on code of jonchurch [otel-issues repository](https://github.com/jonchurch/otel-issues).

And helpful references are:
- [NGINX Tutorial: How to Use OpenTelemetry Tracing to Understand Your Microservices](https://www.nginx.com/blog/nginx-tutorial-opentelemetry-tracing-understand-microservices/)
- [Learn how to instrument nginx with OpenTelemetry](https://opentelemetry.io/blog/2022/instrument-nginx/)

## Prerequisites

- Linux: this project is developed under linux system and some changes could be necessary to run it on other SO's.
- Docker and Docker Compose
- NodeJS (at least v16.16.0)

## Components
- NodeJS client
- Nginx
- Tomcat (dummy server)
- OpenTelemetry Collect
- Jaeger

## Run
- Create beforehand docker network

```sh
docker network create otel-network
```

-  Install NodeJS clients dependencies

```sh
cd apps
npm i
```

- Run on root folder:

```sh
docker compose up -d
```

- View traces on Jaeger UI: http://localhost:16686/

- Stop containers

```sh
docker compose down
```