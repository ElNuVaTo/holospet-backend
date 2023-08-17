import mongoose from "mongoose";
import * as dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGO_URI;
const database = process.env.DATABASE;

const options = {
  useNewUrlParser: true,
  dbName: database,
  useUnifiedTopology: true,
};

mongoose.set("strictQuery", false);
mongoose.connect(uri, options).then(
  () => {
    console.log("conectado a mongoDB");
  },
  (err) => {
    console.log(err);
  }
);
