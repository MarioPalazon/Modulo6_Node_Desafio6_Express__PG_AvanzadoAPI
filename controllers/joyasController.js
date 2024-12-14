const joyasBD=require("../models/joyasBD.js");

const obtenerJoyas = async(req,res)=>{

    try {

        const {limits,page,order_by}=req.query;

        const[field,direction]=order_by.split("_");
        
        let {data,totalJoyas}=await joyasBD.obtenerJoyasBD(limits,page,field,direction);

        if(data===undefined){
            data = [];
            totalJoyas=0;
        }
        

        const stockTotal = data.reduce((acumulador,stock)=>acumulador+stock.stock,0);
        
        const results= data.map((x=>{
            return {
                "nombre":x.nombre,
                "href":`/joyas/joya/${x.id}`
            }
        }))

        return res.status(200).json({
            "paginaActual":Number(page??1),
            "totalJoyas":Number(totalJoyas),
            "stockTotal":Number(stockTotal),
            results
        });
       
    } catch (error) {
        res.status(500).json({
            "status":"NOK",
            "msg":error.message
        });
    }

}

const obtenerJoyasFiltros = async (req,res)=>{
    
    try {
        
        const { precio_max, precio_min, categoria, metal }=req.query;

        const data= await joyasBD.obtenerJoyasFiltrosBD(precio_max,precio_min,categoria,metal);

        res.status(200).json(data);

    } catch (error) {
        res.status(500).json({
            "status":"NOK",
            "msg":error.message
        });
    }
}

module.exports={
    obtenerJoyas,
    obtenerJoyasFiltros
}