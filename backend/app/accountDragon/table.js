const pool = require("../../databasePool");

class AccountDragonTable {
  static storeAccountDragon({ accountId, dragonId }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `INSERT INTO accountDragon ("accountId", "dragonId")
                VALUES($1, $2)`,
        [accountId, dragonId],
        (error, response) => {
          if (error) return reject(error);

          resolve();
        }
      );
    });
  }

  static getAcountDragons({ accountId }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT "dragonId"
        FROM accountDragon
        WHERE "accountId"=$1`,
        [accountId],
        (error, response) => {
          if (error) return reject(error);

          resolve({ accountDragons: response.rows }); // return array of dragonId's
        }
      );
    });
  }

  static getdragonAccount({ dragonId }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT "accountId"
        FROM accountDragon
        WHERE "dragonId" = $1`,
        [dragonId],
        (error, response) => {
          if (error) return reject(error);

          if (response.rows[0] === undefined)
            throw new Error("No rows returned");

          resolve({ accountId: response.rows[0].accountId });
        }
      );
    });
  }

  static updateDragonAccount({ dragonId, accountId }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `UPDATE accountDragon
        SET "accountId" = $1
        WHERE "dragonId" = $2`,
        [accountId, dragonId],
        (error, response) => {
          if (error) return reject(error);

          resolve();
        }
      );
    });
  }
}

/******************* debugging code *****************/

// AccountDragonTable.storeAccountDragon({ accountId: 1, dragonId: 3 })
//   .then(() => console.log("created an accountDragon"))
//   .catch(e => console.log(e));

// AccountDragonTable.getAcountDragons({ accountId: 1 })
//   .then(({ accountDragons }) => console.log(accountDragons))
//   .catch(error => console.log(error));

// AccountDragonTable.getdragonAccount({ dragonId: 2 })
//   .then(accountId => console.log(accountId))
//   .catch(error => console.log(error));

// AccountDragonTable.updateDragonAccount({ dragonId: 2, accountId: 1 })
//   .then(() => console.log("success"))
//   .catch(error => console.log(error));

module.exports = AccountDragonTable;
