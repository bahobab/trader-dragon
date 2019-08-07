const express = require("express");
const bodyPasrser = require("body-parser");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");

const SECRET = require("../secrets");

const GenerationEngine = require("./generation/engine");
const engine = new GenerationEngine();

const dragonRouter = require("./api/dragon");
const generationRouter = require("./api/generation");
const accountRouter = require("./api/account");

const app = express();

app.locals.engine = engine; // to avoid loops

app.use(helmet());

app.use(bodyPasrser.json());
app.use(bodyPasrser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(cors({ origin: "http://localhost:1234", credentials: true }));

app.use("/account", accountRouter);
app.use("/dragon", dragonRouter);
app.use("/generation", generationRouter);

// app.use(express.session({cookie: { path: '/', httpOnly: true, maxAge: null}, secret:'eeuqram'}));

// this middleware should be place after the routes above
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({ type: "error", message: err.message });
});

engine.start();

// const PORT = 6000;

module.exports = app;

// setTimeout(() => engine.stop(), 20000); const Generation =
// require('./generation'); const generation = new Generation();
// console.log('generation', generation); const gooby = generation.newDragon();
// console.log('gooby', gooby); setTimeout(() => { // simulate expiration const
// mimar = generation.newDragon(); console.log('mimar', mimar); }, 5000); const
// Dragon = require('./dragon'); const fooey = new Dragon({     birthdate: new
// Date().toLocaleDateString(), nickname: 'fooey' }); const baloo = new Dragon({
//     nickname: 'baloo', birthdate: new Date().toLocaleDateString(),   traits:
// [         { traitType: 'backgroundColor',             traitValue: 'green' } ]
// }); const minar = new Dragon(); setTimeout(() => { const gooby = new
// Dragon(); console.log('Gooby', gooby); }, 3000); console.log('fooey', fooey);
// console.log('baloo', baloo); console.log('minar', minar);
