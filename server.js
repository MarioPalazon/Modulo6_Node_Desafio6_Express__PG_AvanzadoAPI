const loggerMiddleware=require("./middlewares/loggerMiddleware.js");

const express = require('express')
const app = express();

//Middleware
app.use(express.json());

//Importar las rutas desde carpeta routes
const joyasRoutes=require('./routes/routesJoyas.js');
const sinRoutes=require("./routes/routesNoExiste.js");

// Usar el middleware en toda la aplicación
app.use(loggerMiddleware.requestLoggerMiddleware("./logs/request.log")); // se usa para registrar en el archivo request.log las solicitudes a los endpoints
app.use(loggerMiddleware.responseLoggerMiddleware("./logs/response.log")); // se usa para registrar en el archivo response.log las respuestas de los endpoints


//Configuraciones Rutas
app.use('/joyas',joyasRoutes);
app.use('*',sinRoutes);

//Instanciando servidor
app.listen(
    3000, 
    console.log("¡Servidor encendido!")
);

