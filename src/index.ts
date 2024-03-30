import "dotenv/config";
import express from "express";
import rootRouter from "./routes/root.js";
import session from "./session.js";

const app = express();


app.use(session);

app.use("/", rootRouter);

app.listen(3000, onServerStart);

async function onServerStart() {
  console.log("the server is running on port 3000");
}
