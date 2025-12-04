const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

//routes

const app = express();

app.use(cors({ origin: process.env.DOMAIN }));
app.use(express.json());

//use routes

const PORT = process.env.PORT || 8095;

app.listen(PORT, () => {
  console.log(`Server is running on port: http://localhost:${PORT}`);
});
