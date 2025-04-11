import express from "express";
import connectToDatabase from "./utils/db.mjs";
import dotenv from "dotenv";
import router from "./routes/questionsRoutes.mjs";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import { errorHandler } from "./middleware/errorHandler.mjs";

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(morgan("dev"));

const swaggerDocument = YAML.load("./docs/swagger.yaml");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/", router);


app.use(errorHandler);

app.listen(port, () => {
  connectToDatabase()
  console.log(`Server is running at ${port}`);
});
