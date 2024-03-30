import pgSession from "connect-pg-simple";
import expressSession from "express-session";
import { pgPool } from "../config/database.js";

const pgStore = pgSession(expressSession);

const sessionStore = new pgStore({ pool: pgPool });

const session = expressSession({
  store: sessionStore,
  secret: process.env.SESSION_SECRET ?? "secret",
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 24 * 60 * 60 * 1000 },
});

export default session;
