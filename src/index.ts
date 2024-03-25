import pgSession from "connect-pg-simple";
import express from "express";
import expressSession from "express-session";
import { pgPool } from "./config/database.js";

const app = express();

const pgStore = pgSession(expressSession);

const sessionStore = new pgStore({
  pool: pgPool,
});

app.use(
  expressSession({
    store: sessionStore,
    secret: process.env.SESSION_SECRET ?? "secret",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 24 * 60 * 60 * 1000 },
  }),
);

app.get("/", function (req, res) {
  if (req.session.visited) {
    req.session.visited++;
  } else {
    req.session.visited = 1;
  }

  res.send(`<h1>You have visited this session: ${req.session.visited}</h1>`);
});

app.listen(3000, function () {
  console.log("the server is running on port 3000");
});
