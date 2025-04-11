// Create PostgreSQL Connection Pool here !
import * as pg from "pg";
const { Pool } = pg.default;
import dotenv from "dotenv";
dotenv.config();

const connectionPool = new Pool({
  connectionString: process.env.DATABASE_URL
});

const connectToDatabase = async () => {
  try {
    const client = await connectionPool.connect();
    console.log("Connected to PostgreSQL database");
    client.release();
  } catch (error) {
    console.error("Error connecting to PostgreSQL database", error);
  }
}

export default connectToDatabase;
