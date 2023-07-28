import {env,swaggerOptions} from "./src/config/config.js"
import express from "express";
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose';
import { __dirname } from "./src/path.js";
import routers from './src/routes/routes.js'
import passport from "passport";
import initializePassport from "./src/middleware/passport.js";
import session from 'express-session';
import errorHandler from "./src/middleware/errors/errorHandler.js";
import { addLogger } from './src/utils/logger.js'
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUiExpress from 'swagger-ui-express'
import cors from 'cors'

// const whiteList = ['https://dinuzzo-frontend.vercel.app', 'http://localhost:4000'] // Rutas validas de mi servidor

// const corsOptions = { // Reviso si el cliente que intenta ingresar a mi servidor esta o no en esta lista
//   origin: (origin, callback) => {
//       if (whiteList.indexOf(origin) !== -1) {
//           callback(null, true)
//       } else {
//           callback(new Error('Not allowed by Cors'))
//       }
//   }
// }

const app = express(); 

// Middleware para habilitar CORS

// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', 'https://dinuzzo-frontend.vercel.app');
//   res.setHeader('Access-Control-Allow-Methods', );
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//   res.setHeader('Access-Control-Allow-Credentials', 'true');
//   next();
// });

// Define los middleware para la aplicación
app.use(express.json())

app.use(cors(
  {
    origin: ['https://ecommerce-mern-coder.vercel.app'],
    methods: ['POST', 'GET', 'PUT' , 'DELETE'],
    credentials: true
  }
))
// app.use(cors(corsOptions))

app.use(express.urlencoded({ extended: true })); //Permite realizar consultas en la URL (req.query)
app.use(cookieParser(env.cookieSecret))

//session
app.use(session({  
  secret: env.sessionSecret,
  resave: true,
  saveUninitialized: true
}))

//Passport (usa session)
app.use(passport.initialize())

initializePassport(passport)

//MONGOOSE (set and connection)
const connectionMongoose = async () => {
  await mongoose.connect(env.urlMongoDb, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .catch((err) => console.log(err));
}

app.use(addLogger)

connectionMongoose()

//Routers
app.use('/', routers)

//Public folder
app.use('/', express.static(__dirname + '/public'))

const specs = swaggerJSDoc(swaggerOptions)
app.use('/apidocs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs))

app.use(errorHandler); 

// if a URL is invalid display a message
app.use((req, res, next)=> {
  res.status(404).send({error:'Lo siento, no se pudo encontrar la página que estás buscando.'});
});

// Configura el puerto del servidor y lo inicia
app.set ("port", env.port || 5000)

app.listen(app.get("port"), () => {
  console.log(`Server on port ${app.get("port")}`)
})
