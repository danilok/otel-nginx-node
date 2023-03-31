FROM nginx:1.23.1

# Define the version of the NGINX OTel module
ARG OPENTELEMETRY_CPP_VERSION=1.0.3

ARG OTEL=https://github.com/open-telemetry/opentelemetry-cpp-contrib/releases/download/webserver%2Fv${OPENTELEMETRY_CPP_VERSION}/opentelemetry-webserver-sdk-x64-linux.tgz

ADD ${OTEL} /opt

RUN \
    apt update && \
    apt install unzip && \
    cd /opt && \
    tar xvfz opentelemetry-webserver-sdk-x64-linux.tgz && \
    cd /opt/opentelemetry-webserver-sdk; ./install.sh && \
    echo "load_module /opt/opentelemetry-webserver-sdk/WebServerModule/Nginx/1.23.1/ngx_http_opentelemetry_module.so;\n$(cat /etc/nginx/nginx.conf)" > /etc/nginx/nginx.conf

ENV LD_LIBRARY_PATH=$LD_LIBRARY_PATH:/opt/opentelemetry-webserver-sdk/sdk_lib/lib

COPY opentelemetry_module.conf /etc/nginx/conf.d
