const Generation = require("./generation");

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
    this.generation = new Generation();

    console.log("new generation:", this.generation);

    this.timer = setTimeout(
      () => this.buildNewGeneration(),
      this.generation.expiration.getTime() - Date.now()
    );
  }
}

module.exports = GenerationEngine;
