const base64 = require("base-64");
const Dragon = require("./index");

class Breeder {
  static breedDragon({ matron, patron }) {
    const matronTraits = matron.traits;
    const patronTraits = patron.traits;

    const babyTraits = [];

    matronTraits.forEach(({ traitType, traitValue }) => {
      const matronTrait = traitValue;

      const patronTrait = patronTraits.find(
        trait => trait.traitType === traitType
      ).traitValue;

      babyTraits.push({
        traitType,
        traitValue: Breeder.pickTrait({ matronTrait, patronTrait })
      });
    });

    return new Dragon({ nickname: "Unnamed Baby", traits: babyTraits });
  }

  //   Two incoming traits: matronTrait and patronTrait:
  //   The matronTrait and patronTrait string values are encoded
  //   Both traits have their characters summed.
  //   Get a range by addig both character sums.
  //   Generate a random nmber, in that range.
  //   If the number is less than the matron's character sum, pick matron.
  //   else, pick patron
  static pickTrait({ matronTrait, patronTrait }) {
    if (matronTrait === patronTrait) return matronTrait;

    const matronTraitCharSum = Breeder.charSum(base64.encode(matronTrait));
    const patronTraitCharSum = Breeder.charSum(base64.encode(patronTrait));

    const randNum = Math.floor(
      Math.random() * (matronTraitCharSum + patronTraitCharSum)
    );

    return randNum < matronTraitCharSum ? matronTrait : patronTrait;
  }

  static charSum(string) {
    return string
      .split("")
      .reduce((sum, character) => (sum += character.charCodeAt()), 0);
  }
}

/************* Debugging code ***********************/

// const foofoo = new Dragon();
// const tonton = new Dragon();

// console.log("foofoo", foofoo);
// console.log("tonton", tonton);

// const tonfoo = Breeder.breedDragon({ matron: foofoo, patron: tonton });

// console.log("tonfoo", tonfoo);

module.exports = Breeder;
