import express from "express";
import rootRouter from "./routes/root.js";
import session from "./middlewares/session.js";

const app = express();

// setting up middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session);

// all routes
app.use("/", rootRouter);

export default app;
