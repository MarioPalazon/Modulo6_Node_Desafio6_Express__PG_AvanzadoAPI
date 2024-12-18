const express=require("express");
const api=express.Router();

//importando el controlador de joyas
const JoyasController=require("../controllers/joyasController.js");

/**
 * @swagger
 * /:
 *   get:
 *     tags: 
 *       - Joyas
 *     summary: Obtiene todas las joyas usando paginacion y campos para ordenar 
 *     parameters:
 *       - in: query
 *         name: limits
 *         required: false
 *         description: se define la cantidad de registros a mostrar por pagina
 *         schema:
 *           type: integer
 * 
 *       - in: query
 *         name: page
 *         required: false
 *         description: se define la pagina a consultar
 *         schema:
 *           type: integer
 * 
 *       - in: query
 *         name: order_by
 *         required: false
 *         description: se indica el campo para ordenar los registros al momento de mostrar las joyas
 *         schema:
 *           type: string
 * 
 *     responses: 
 *       200:
 *         description: Lista todas las Joyas
 *         content:
 *           application/json:
 *             schema:
 *               tyoe: array
 *               items:
 *                 $ref: "#/components/schemas/ParamsGet"
 * 
 */
api.get("/",JoyasController.obtenerJoyas);


/**
 * @swagger   
 * /filtros:
 *   get:
 *     tags: 
 *       - Joyas
 *     summary: Obtiene todas las joyas usando filtros de maximo y minino, categoria y metal
 *     parameters:
 *       - in: query
 *         name: precio_min
 *         required: false
 *         description: filtra las joyas por el precio minimo a mostrar
 *         schema:
 *           type: integer
 * 
 *       - in: query
 *         name: precio_max
 *         required: false
 *         description: filtra las joyas por el precio maximo a mostrar
 *         schema:
 *           type: integer
 * 
 *       - in: query
 *         name: categoria
 *         required: false
 *         description: filtra las joyas por la categoria por ejemplo collar aros anillo
 *         schema:
 *           type: string
 * 
 *       - in: query
 *         name: metal
 *         required: false
 *         description: filtra las joyas por el metal por ejemplo oro plata
 *         schema:
 *           type: string
 * 
 *     responses: 
 *       200:
 *         description: Lista toda las joyas por el filtro aplicado anteriormente
 *         content:
 *           application/json:
 *             schema:
 *               tyoe: array
 *               items:
 *                 $ref: "#/components/schemas/ParamsGetFiltros"
 * 
 */
api.get("/filtros",JoyasController.obtenerJoyasFiltros);

module.exports = api;