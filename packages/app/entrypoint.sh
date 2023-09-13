#!/bin/sh
echo "start container entry point"

if [ -f ./todo.db ]; then
  echo "delete $DB_PATH"
  rm $DB_PATH
fi

litestream restore -v -if-replica-exists -o $DB_PATH s3://$REPLICATE_BUCKET_NAME/$REPLICATE_PATH
sqlite3 ./todo.db < ./schema.sql
exec litestream replicate -exec "bun run --bun ./src/main.ts"
