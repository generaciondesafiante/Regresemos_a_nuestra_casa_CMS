const express = require('express');
const { dbConection } = require('./database/config');
// const cors = require('cors')
const cors=require("cors");


const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
   'Access-Control-Allow-Origin': '*'
}


require('dotenv').config()

// console.log( process.env )


//Crear el servidor de express
const app = express()
app.use(cors(corsOptions))

//base de datos
dbConection()


//Directorio publico
app.use( express.static('public'));

//Lectura y parseo del body
app.use(express.json())

//Rutas
//todo: auth//crear, login, renew del token
app.use('/api/auth', require('./routes/auth'))
//todo: CRUD: EVENTOS
  
// app.use(cors())

//escuchar peticiones
app.listen( process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${ process.env.PORT }`)
} )     