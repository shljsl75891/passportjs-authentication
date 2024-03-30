import "dotenv/config";
import express from "express";
import { sequelize } from "./config/database.js";
import User from "./models/user.js";
import rootRouter from "./routes/root.js";
import session from "./session.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session);

app.use("/", rootRouter);

app.listen(3000, onServerStart);

async function onServerStart() {
  try {
    await sequelize.authenticate();
    await User.sync({ force: true });
  } catch (err: any) {
    console.error("Something went wrong !!!", err.name + ": " + err.message);
  }
  console.log("the server is running on port 3000");
}
