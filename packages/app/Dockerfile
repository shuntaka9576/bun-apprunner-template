FROM debian:stable-slim as get

WORKDIR /bun

RUN apt-get update
RUN apt-get install curl unzip -y
RUN curl --fail --location --progress-bar --output "/bun/bun.zip" "https://github.com/oven-sh/bun/releases/download/bun-v1.0.1/bun-linux-x64-baseline.zip"
RUN unzip -d /bun -q -o "/bun/bun.zip"
RUN mv /bun/bun-linux-x64-baseline/bun /usr/local/bin/bun
RUN chmod 777 /usr/local/bin/bun

COPY package.json bun.lockb /bun
COPY packages/app /bun/packages/app
RUN bun install

ADD https://github.com/benbjohnson/litestream/releases/download/v0.3.11/litestream-v0.3.11-linux-amd64.tar.gz /tmp/litestream.tar.gz
RUN tar -C /usr/local/bin -xzf /tmp/litestream.tar.gz

FROM debian:stable-slim

WORKDIR /work

COPY --from=get /usr/local/bin/bun /bin/bun
COPY --from=get /usr/local/bin/litestream /bin/litestream
COPY --from=get /bun/node_modules /work/node_modules
COPY --from=get /bun/packages /work/packages

RUN apt-get update && \
  apt-get install -y \
    sqlite3 \
    ca-certificates && \
  rm -rf /var/lib/apt/lists/*

RUN mv /work/packages/app/litestream.yml /etc
RUN chmod +x /work/packages/app/entrypoint.sh

WORKDIR /work/packages/app

ENTRYPOINT ["./entrypoint.sh"]
