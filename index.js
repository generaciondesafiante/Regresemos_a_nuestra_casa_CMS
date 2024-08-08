const express = require("express");
const { dbConection } = require("./database/config");
const cors = require("cors");

const path = require("path");
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

const servers = [
  { url: "http://localhost:8080" },
  { url: "https://regresemos-cms.herokuapp.com" },
];

const swaggerSpec = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "Documentación Generacion Desafiante",
      version: "1.0.0",
    },
    servers: servers,
  },
  apis: [`${path.join(__dirname, "./routes/**/*.js")}`],
};

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
  "Access-Control-Allow-Origin": "*",
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
app.use("/api/user", require("./routes/user"));
app.use("/api/course", require("./routes/course"));
app.use("/api/resources", require("./routes/resources"));
app.use(
  "/api/doc",
  swaggerUi.serve,
  swaggerUi.setup(swaggerJsDoc(swaggerSpec))
);

//todo: CRUD: EVENTOS

//listen requests
app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
  console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});
