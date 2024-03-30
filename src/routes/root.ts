import express from "express";
import { getGreet } from "../controllers/greet.js";

const router = express.Router();

router.route("/").get(getGreet);

export default router;
