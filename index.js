const express = require("express");
const { dbConection } = require("./database/config");
const cors = require("cors");

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
  "Access-Control-Allow-Origin": "*",
};

require("dotenv").config();

//Create the express server
const app = express();
app.use(cors(corsOptions));

//database
dbConection();

//Public directory
app.use(express.static("public"));

//Read and parse the body
app.use(express.json());

//Routes
//todo: auth//create, login, renew del token
app.use("/api/auth", require("./routes/auth"));
app.use("/api/course", require("./routes/course"));
app.use("/api/resources", require("./routes/resources"));
//todo: CRUD: EVENTOS

//listen requests
app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});
