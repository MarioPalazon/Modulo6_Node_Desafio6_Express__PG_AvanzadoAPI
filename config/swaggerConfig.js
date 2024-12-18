const swaggerJSDoc=require("swagger-jsdoc");
const swaggerUI=require("swagger-ui-express");

const options={
    definition:{
        openapi:"3.0.0",
        info:{
            title:"API de consultas de Joyas",
            version:"1.0.0",
            description:"API para realizar consultas de las joyas existentes incluyendo paginacion y filtros de busquedas"
        },
        servers:[
            {
                url:"http://localhost:3000/joyas"
            }
        ],
        tags:{
          name:"Joyas",
        },
        components:{
            schemas:{
                ParamsGet:{
                    properties:{
                        limits:{
                            type:"integer",
                            example:10,
                        },
                        page:{
                            type:"integer",
                            example:1,
                        },
                        order_by:{
                            type:"string",
                            example:"Id_ASC"
                        }
                    }
                },
                ParamsGetFiltros:{
                  properties:{
                      precio_max:{
                          type:"integer",
                          example:100,
                      },
                      precio_min:{
                          type:"integer",
                          example:10,
                      },
                      categoria:{
                          type:"string",
                          example:"anillo"
                      },
                      metal:{
                          type: "string",
                          example: "oro"
                      }
                  }
              }
            }
        }
    },
    apis:["./routes/routesJoyas.js"]
}

const swaggerSpec=swaggerJSDoc(options);

const setupSwaggerDocs=(app)=>{
   
    app.use("/api-docs",swaggerUI.serve,swaggerUI.setup(swaggerSpec));

    console.log("Swagger docs disponible en la ruta http://localhost:3000/api-docs")
}

module.exports=setupSwaggerDocs;