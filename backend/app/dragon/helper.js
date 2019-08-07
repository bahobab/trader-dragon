const pool = require("../../databasePool");
const Dragon = require("./index");

const DragonTable = require("./table");

const getDragonWithTraits = ({ dragonId }) => {
  return Promise.all([
    DragonTable.getDragon({ dragonId }),
    new Promise((resolve, reject) => {
      pool.query(
        `SELECT "traitType", "traitValue"
                    FROM trait
                    INNER JOIN dragonTrait ON trait.id = dragonTrait."traitId"
                    WHERE dragonTrait."dragonId" = $1`,
        [dragonId],
        (error, response) => {
          if (error) return reject(error);

          resolve(response.rows);
        }
      );
    })
  ])
    .then(([dragon, dragonTraits]) => {
      // dragon.dragonId = dragonId;
      // dragon.traits = dragonTraits;
      // return dragon;

      /**** for consistency return a Dragoninstance *****/
      return new Dragon({ ...dragon, dragonId, traits: dragonTraits });
    })
    .catch(error => console.error(error));
};

const getPublicDragons = () => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT id FROM dragon
      WHERE "isPublic" = TRUE`,
      (error, response) => {
        if (error) return reject(error);

        const publicDragons = response.rows;

        Promise.all(
          publicDragons.map(({ id }) => getDragonWithTraits({ dragonId: id }))
        )
          .then(dragons => resolve({ dragons }))
          .catch(error => reject(error));
      }
    );
  });
};

/***** debugging code  *************/
/* makesure to first create dragons ***/
/* by visiting http://localhost:3003/gragon/new ***/

// getDragonWithTraits({ dragonId: 4 })
//   .then(dragon => console.log(">?>?>?", dragon))
//   .catch(error => console.error(error));

module.exports = { getDragonWithTraits, getPublicDragons };
