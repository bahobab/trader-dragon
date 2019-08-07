const Generation = require("./index");
const GenerationTable = require("../generation/table");

class GenerationEngine {
  constructor() {
    // this.expiration = generation.expiration;
    this.generation = null;
    this.timer = null;
  }

  start() {
    console.log("Generation starts...");
    this.buildNewGeneration();
  }

  stop() {
    console.log("Generation ends...");
    clearTimeout(this.timer);
  }

  buildNewGeneration() {
    const generation = new Generation();

    GenerationTable.storeGeneration(generation)
      .then(generationId => {
        this.generation = generation;
        this.generation.generationId = generationId;

        console.log("new generation:", this.generation);

        this.timer = setTimeout(
          () => this.buildNewGeneration(),
          this.generation.expiration.getTime() - Date.now()
        );
      })
      .catch(error => console.error);
  }
}

module.exports = GenerationEngine;
