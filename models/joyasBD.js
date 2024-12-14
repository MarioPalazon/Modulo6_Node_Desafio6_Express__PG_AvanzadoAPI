const pool=require("../db/conexion.js");
const format=require("pg-format");

const obtenerJoyasBD = async (limits=10,page=1,field="id",direction="ASC")=>{
    try {

        if(page<1){
            page=1;
        }

        if(limits>10 || limits<1){
            limits=10;
        }

        let offset = (page-1) * limits;

        let queryFormateada=format(`select * from inventario order by %s %s limit %s offset %s`,
            field,direction,limits,offset
        );

        let {rows:data} = await pool.query(queryFormateada);
        
        const totalJoyas = await obtenerCantidad();
    
        return {data,totalJoyas};


    } catch (error) {
        return error;
    }
}

const obtenerJoyasFiltrosBD = async (precioMax=0,precioMin=0,categoia="",metal="")=>{

    try {
        
        const filtros = arregloJoyasFiltros(precioMax,precioMin,categoia,metal);

        let query = format(`select * from inventario`);

        if(filtros.length > 0){
            const queryAnd = filtros.join(" and ");
            query += ` where ${queryAnd}`;
        }
        
        const { rows: data } = await pool.query(query);
        
        return data;

    } catch (error) {
        return error;

    }
}

const obtenerCantidad=  async () =>{
    const query="select count(*) from inventario";

    const data=await pool.query(query);
    const count = data.rows[0]?.count;

    return count;
}

const arregloJoyasFiltros=(precioMax,precioMin,categoria,metal)=>{

    let filtros = [];

    if(precioMax!==undefined && precioMax>0){
        filtros.push(`precio <= ${precioMax}`);
    }

    if(precioMin!==undefined && precioMin >0){
        filtros.push(`precio >= ${precioMin}`);
    }

    if(categoria!==undefined && categoria.trim()!==""){
        filtros.push(`categoria like '${categoria}%'`);
    }

    if(metal!==undefined && metal.trim()!==""){
        filtros.push(`metal like '${metal}%'`);
    }

    return filtros;
}

module.exports={
    obtenerJoyasBD,
    obtenerJoyasFiltrosBD
}