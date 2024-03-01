const dotenv = require('dotenv');

// Determina el archivo .env basado en NODE_ENV
const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development';

// Carga el archivo .env correspondiente
dotenv.config({ path: envFile });

const mongoose = require("mongoose");

if (!process.env.MONGO_URL) {
  throw new Error("Please add the MONGO_URL environment variable");
}

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const database = mongoose.connection;

database.on(
  "error",
  console.error.bind(console, "❌ mongodb connection error:")
);
database.once("open", () => {
  console.log("✅ mongodb connected successfully");
});

mongoose.Promise = global.Promise;
