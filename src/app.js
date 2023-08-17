import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import * as dotenv from "dotenv";

import router from "./router/router";
import baseDatos from "./db/mongoDB";

dotenv.config();
const app = express();

//middleware
app.use(morgan("tiny"));
app.use(
  cors({
    origin: ["http://localhost:5173", "http://192.168.100.16:5173/"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Rutas
app.use("/api/", router);

app.set("puerto", process.env.PORT || 3000);
app.listen(app.get("puerto"), () => {
  console.log("Escuchando el puerto ", app.get("puerto"));
});
