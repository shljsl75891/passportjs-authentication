import "dotenv/config";
import { sequelize } from "./config/database.js";
import User from "./models/user.js";
import app from "./app.js";

async function onServerStart() {
  try {
    await sequelize.authenticate();
    await User.sync({ force: true });
  } catch (err: any) {
    console.error("Something went wrong !!!", err.name + ": " + err.message);
  }
  console.log("the server is running on port 3000");
}

app.listen(3000, onServerStart);
