import express from "express";
import connectionPool from "./utils/db.mjs";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());

app.get("/test", (req, res) => {
  return res.json("Server API is working 🚀");
});

(async () => {
  try {
    const client = await connectionPool.connect();
    console.log("Connected to PostgreSQL database");
    client.release();
  } catch (error) {
    console.error("Error connecting to PostgreSQL database", error);
  }
}
)();

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
