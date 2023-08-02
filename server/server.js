import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import mongoose from "mongoose";
import cors from "cors";
import dontenv from "dotenv";
import helmet from "helmet";

import clientRoutes from "./routes/client.js";
import generalRoutes from "./routes/gereral.js";
import managementRoutes from "./routes/management.js";
import ticketingRoutes from "./routes/ticketing.js";

// CONFIGURATION
dontenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// ROUTES

app.use("/client", clientRoutes);
app.use("/general", generalRoutes);
app.use("/management", managementRoutes);
app.use("/ticketing", ticketingRoutes);

const port = process.env.PORT || 9000;
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(port, () => {
      console.log(`server running sucessfully on port: ${port}`);
    });
  })
  .catch((err) => {
    console.log(`Error in connection: \n ${err}`);
  });
