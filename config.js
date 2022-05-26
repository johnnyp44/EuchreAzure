const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
//const { COSMOS_USER, COSMOS_PASSWORD, DB_USER_MONGO, DB_PASSWORD_MONGO} = process.env;
//url = `mongodb://localhost:27017/EuchreStats`
//url = `mongodb://${COSMOS_USER}:${COSMOS_PASSWORD}@euchrestats.mongo.cosmos.azure.com:10255/EuchreStats?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@euchrestats@`
//url = //`mongodb+srv://${DB_USER_MONGO}:${DB_PASSWORD_MONGO}@euchrestats.xtby3.mongodb.net/EuchreStats?retryWrites=true&w=majority`
url = "mongodb://"+process.env.COSMOS_USER+":"+process.env.COSMOS_PASSWORD+"@euchrestats.mongo.cosmos.azure.com:10255/EuchreStats?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@euchrestats@"

const connectDB = () => {
  return mongoose
    .connect(url,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    .then(() => console.log(`database connected successfully`))
    .catch((err) => console.log("db connection failed: with error " + err.message));
};
module.exports = connectDB;
