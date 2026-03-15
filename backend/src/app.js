import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import routes from "./routes/index.js";


const app = express();


// security headers
app.use(helmet());

// routes
app.use("/api", routes);

// enable cors
app.use(cors());

// body parser
app.use(express.json());

// request logger
app.use(morgan("dev"));


export default app;