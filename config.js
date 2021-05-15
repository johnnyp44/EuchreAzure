const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
const { DB_USER, DB_PASSWORD, DB_USER_MONGO, DB_PASSWORD_MONGO} = process.env;

const connectDB = () => {
  return mongoose
    .connect(
      //`mongodb://localhost:27017/EuchreStats`,
      `mongodb://${DB_USER}:${DB_PASSWORD}@euchrestats.mongo.cosmos.azure.com:10255/EuchreStats?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@euchrestats@`,
      //`mongodb+srv://${DB_USER_MONGO}:${DB_PASSWORD_MONGO}@euchrestats.xtby3.mongodb.net/EuchreStats?retryWrites=true&w=majority`,
      {
        useCreateIndex: true,
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
      }
    )
    .then(() => console.log(`database connected successfully`))
    .catch((err) => console.log(err.message));
};
module.exports = connectDB;
