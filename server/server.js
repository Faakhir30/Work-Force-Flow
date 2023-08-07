import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import cors from "cors";
import dontenv from "dotenv";
import helmet from "helmet";
import userRoutes from "./routes/userRoutes.js"
import projectsRoutes from "./routes/projectRoutes.js";
import ticketingRoutes from "./routes/ticketRoutes.js";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";

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
app.use(cookieParser());

// ROUTES

app.use('/api/users', userRoutes);
app.use("/api/projects", projectsRoutes);
app.use("/api/tickets", ticketingRoutes);

const port = process.env.PORT || 9000;
connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`server running sucessfully on port: ${port}`);
    });
  })
  .catch((err) => {
    console.log(`Error in connection: \n ${err}`);
  });
