const fs = require('fs');

const requestLoggerMiddleware =(rutaLogger) =>(req, res, next) => {
  
    const inicio = Date.now();

    res.on('finish', () => {
        const duracion = Date.now() - inicio;
        const log = `[${new Date().toISOString()}]:${req.method} ${req.originalUrl} ${res.statusCode} - ${duracion}ms \n`;

        // Guardar en archivo
        fs.appendFile(rutaLogger, log, (errorLog) => {
        if (errorLog) {
            console.error('Error al escribir en el archivo de registro request.log:', errorLog);
        }
        });

    });

  next(); // Continuar al siguiente middleware
};

const responseLoggerMiddleware=(rutaLogger) => (req, res, next) => {
    const sendResponse = res.send; // Guarda el método original `res.send`
    const inicio = Date.now();
  
    res.send = function (body) {
      const duracion = Date.now() - inicio;
      const log = `[${new Date().toISOString()}] ${req.method} ${req.originalUrl} ${res.statusCode} duracion: ${duracion}ms response: ${body}\n`;
  
      // Escribir log en archivo
      fs.appendFile(rutaLogger,log ,(errorLog) => {
          if (errorLog) {
            console.error('Error al escribir en el archivo de log response.log:', errorLog);
          }
        }
      );
  
      return sendResponse.call(this, body); // Llamar al método original `res.send`
    };
  
    next();
  };

module.exports={
    requestLoggerMiddleware,
    responseLoggerMiddleware
} 
