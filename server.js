const loggerMiddleware=require("./middlewares/loggerMiddleware.js");
const express = require('express');
const setupSwaggerDocs=require("./config/swaggerConfig.js");

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

//usando documentacion con swagger
setupSwaggerDocs(app);

//Configuracion de sin Rutas
app.use('*',sinRoutes);


const PORT=3000;
//Instanciando servidor
app.listen(
    PORT, 
    ()=>{
        console.log(`¡Servidor encendido! http://localhost:${PORT}`)
    }
);

