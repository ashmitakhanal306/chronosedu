#!/bin/bash
set -e

# Set password for chronos_app role from environment variable
if [ -n "$CHRONOS_APP_PASSWORD" ]; then
  psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    ALTER ROLE chronos_app WITH PASSWORD '$CHRONOS_APP_PASSWORD';
EOSQL
  echo "Successfully set chronos_app password from environment variable."
else
  echo "WARNING: CHRONOS_APP_PASSWORD not set; chronos_app role has no password configured."
fi
