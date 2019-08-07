const AccountTable = require("../account/table");
const Session = require("../account/session");
const { hash } = require("../account/helper");

const setSession = ({ username, res, sessionId }) => {
  return new Promise((resolve, reject) => {
    let session, sessionString;

    if (sessionId) {
      sessionString = Session.sessionString({ username, id: sessionId });
      setSessionCookie({ sessionString, res });
      resolve({ message: "Session restored" });
    } else {
      session = new Session({ username });
      sessionString = session.toString();
      AccountTable.updateSessionId({
        sessionId: session.id,
        usernameHash: hash(username)
      })
        .then(() => {
          setSessionCookie({ sessionString, res });

          resolve({ message: "session created!" });
        })
        .catch(error => reject(error));
    }
  });
};

// expire: Date.now() + 3600000,

const setSessionCookie = ({ sessionString, res }) => {
  res.cookie("sessionString", sessionString, {
    expire: Date.now(),
    httpOnly: true
    // secure: true // used in production only
  });
};

const authenticatedAccount = ({ sessionString }) => {
  return new Promise((resolve, reject) => {
    if (!sessionString || !Session.verify(sessionString)) {
      const error = new Error(
        "Please Sign In. If you don't have an account, go ahead and Sign Up"
      );
      error.statusCode = 400;
      return reject(error);
    } else {
      const { username, id } = Session.parse(sessionString);
      const usernameHash = hash(username);

      AccountTable.getAccount({ usernameHash })
        .then(({ account }) => {
          const authenticated = account.sessionId === id;
          resolve({ account, authenticated, username });
        })
        .catch(error => reject(error));
    }
  });
};

module.exports = {
  setSession,
  authenticatedAccount
};
