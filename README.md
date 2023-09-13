# bun-apprunner-template

## Requirements

- [Bun](https://bun.sh/)
- [Litestream](https://litestream.io/)

### Quick Start

#### Deploy AWS

```bash
bun install
cd ./packages/aws
export CDK_DOCKER=$(which finch)
bunx cdk deploy bun-apprunner-app
```

#### Test API

Set API Endpoint.

```bash
export TO="<APP_RUNNER_URL>"
```

POST /tasks

```bash
curl -X POST $TO/tasks -d '{"title": "foo"}'
```

GET /tasks/:taskId

```bash
curl -X GET $TO/tasks/:taskId
```

## Usage

### local

Insatall dependencies.

```bash
bun install --frozen-lockfile
```

Run.

```bash
cd ./packages/app
sqlite3 ./todo.db < ./schema.sql
bun run --hot --bun ./src/main.ts
```

Run with litestream.

```bash
cd ./packages/app
sqlite3 ./todo.db < ./schema.sql
exec litestream replicate -exec "bun run --bun ./src/main.ts"

# or
cd ./packages/app
./entrypoint.sh
```

### container

recommend finch.

```bash
alias docker='finch'
```

Build image.

```bash
docker build \
  --platform=linux/x86_64 \
  -f Dockerfile.app .
```

Run container.

```bash
docker run -it \
  -e DB_PATH=$DB_PATH \
  -e REPLICATE_BUCKET_NAME=$REPLICATE_BUCKET_NAME \
  -e REPLICATE_PATH=$REPLICATE_PATH \
  -e AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID \
  -e AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY \
  -e AWS_SESSION_TOKEN=$AWS_SESSION_TOKEN \
  -e AWS_REGION="ap-northeast-1" \
  $IMAGE_ID
```

### Other

Format.

```bash
deno fmt
```
