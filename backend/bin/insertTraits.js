const pool = require("../databasePool");
const TRAITS = require("../data/traits");

TRAITS.forEach(TRAIT => {
  const traitType = TRAIT.type;
  traitValues = TRAIT.values;

  traitValues.forEach(traitValue => {
    pool.query(
      `INSERT INTO trait("traitType", "traitValue")
        VALUES($1, $2)
        RETURNING id`,
      [traitType, traitValue],
      (error, response) => {
        if (error) return console.error;

        const traitId = response.rows[0].id;

        console.log(`Inserted trait with id: `, traitId);
      }
    );
  });
});
