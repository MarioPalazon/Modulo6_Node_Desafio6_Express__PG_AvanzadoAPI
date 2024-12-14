const express=require("express");
const api=express.Router();

//importando el controlador de joyas
const JoyasController=require("../controllers/joyasController.js");

//creo las rutas de cada endpoint
api.get("/",JoyasController.obtenerJoyas);
api.get("/filtros",JoyasController.obtenerJoyasFiltros);



module.exports = api;