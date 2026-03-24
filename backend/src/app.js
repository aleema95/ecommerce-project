import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import routes from "./routes/index.js";


const app = express();


// security headers
app.use(helmet());

// body parser
app.use(express.json());

// routes
app.use("/api", routes);

// enable cors
app.use(cors());


// request logger
app.use(morgan("dev"));


export default app;