const { Router } = require("express");

const AccountTable = require("../account/table");
const AccountDragonTable = require("../accountDragon/table");
const { hash } = require("../account/helper");
const { getDragonWithTraits } = require("../dragon/helper");
const { setSession, authenticatedAccount } = require("./helper");
const Session = require("../account/session");

const router = new Router();

router.post("/signup", (req, res, next) => {
  const { username, password } = req.body;
  const usernameHash = hash(username);
  const passwordHash = hash(password);

  AccountTable.getAccount({ usernameHash })
    .then(({ account }) => {
      if (!account) {
        return AccountTable.storeAccount({ usernameHash, passwordHash });
      } else {
        const error = new Error("Sorry! Unable to create this account");
        error.statusCode = 409;
        throw error;
      }
    })
    .then(() => {
      // storeAccount returs nothing
      return setSession({ username, res });
    })
    .then(({ message }) => {
      res.status(201).json({ message });
    })
    .catch(error => next(error));
});

router.post("/signin", (req, res, next) => {
  const { username, password } = req.body;
  const usernameHash = hash(username);

  AccountTable.getAccount({ usernameHash })
    .then(({ account }) => {
      if (account && account.passwordHash === hash(password)) {
        const { sessionId } = account;
        return setSession({ username, res, sessionId });
      } else {
        const error = new Error("Incorrect username/password combination");
        error.statusCode = 409;
        throw error;
      }
    })
    .then(({ message }) => res.status(201).json({ message }))
    .catch(error => next(error));
});

router.get("/signout", (req, res, next) => {
  const { username } = Session.parse(req.cookies.sessionString);

  AccountTable.updateSessionId({
    sessionId: null,
    usernameHash: hash(username)
  })
    .then(() => {
      res.clearCookie("sessionString");
      res.status(200).json({ message: "Successfully signed out" });
    })
    .catch(error => next(error));
});

router.get("/authenticated", (req, res, next) => {
  const { sessionString } = req.cookies;

  authenticatedAccount({ sessionString })
    .then(({ authenticated }) => res.json({ authenticated }))
    .catch(error => next(error));
});

router.get("/dragons", (req, res, next) => {
  const { sessionString } = req.cookies;

  authenticatedAccount({ sessionString })
    .then(({ account }) => {
      return AccountDragonTable.getAcountDragons({
        accountId: account.id
      });
    })
    .then(({ accountDragons }) => {
      return Promise.all(
        accountDragons.map(accountDragon => {
          return getDragonWithTraits({ dragonId: accountDragon.dragonId });
        })
      );
    })
    .then(dragons => res.json({ dragons }))
    .catch(error => next(error));
});

router.get("/info", (req, res, next) => {
  authenticatedAccount({ sessionString: req.cookies.sessionString })
    .then(({ account, username }) => {
      res.json({ info: { balance: account.balance, username } });
    })
    .catch(error => next(error));
});

// function isAuthenticated({ req }) {
//   const { sessionString } = req.cookies.sessionString;
//   const { username, id } = sessionString;
//   const storedId = AccountTable.getAccount({ usernameHash: hash(username) })
//     .then(account => {
//       if (account) {
//         if (account.sessionId === id && Session.verify(sessionString)) {
//           return true;
//         }
//       } else {
//         return false;
//       }
//     })
//     .catch(error => false);
// }

module.exports = router;
