#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    CREATE EXTENSION pg_stat_statements;
EOSQL

echo "shared_preload_libraries = 'pg_stat_statements'" >> /var/lib/postgresql/data/postgresql.conf
echo "pg_stat_statements.track = all" >> /var/lib/postgresql/data/postgresql.conf
echo "pg_stat_statements.max = 10000" >> /var/lib/postgresql/data/postgresql.conf