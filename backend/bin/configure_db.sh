#!/bin/bash

source dev.sh

export PGPASSWORD=$DB_PASSWORD

dropdb -U node_user dragonstackdb
createdb -U node_user dragonstackdb

echo 'Configuring dragonstackdb'

psql -U node_user dragonstackdb < ./bin/sql/generation.sql
psql -U node_user dragonstackdb < ./bin/sql/dragon.sql
psql -U node_user dragonstackdb < ./bin/sql/trait.sql
psql -U node_user dragonstackdb < ./bin/sql/dragonTrait.sql
psql -U node_user dragonstackdb < ./bin/sql/account.sql
psql -U node_user dragonstackdb < ./bin/sql/accountDragon.sql

node ./bin/insertTraits.js

echo 'Done Configuring dragonstackdb'

# ************ example queries: ********************
# ragonstackdb=# select * from trait INNER JOIN dragonTrait ON trait.id = dragonTrait."traitId";
# dragonstackdb=# select * from dragon INNER JOIN dragonTrait ON dragon.id = dragonTrait."dragonId" INNER JOIN trait ON dragonTrait."traitId" = trait.id;