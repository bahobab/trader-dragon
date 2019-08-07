CREATE TABLE account(
    id                  SERIAL PRIMARY KEY,
    "usernameHash"      CHARACTER(64) NOT NULL,
    "passwordHash"      CHARACTER(64) NOT NULL,
    "sessionId"         CHARACTER(36),
    balance             INTEGER NOT NULL
);