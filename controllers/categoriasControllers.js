const connection =require("../database");

const obtenerCategorias=(req,res) => {
    connection.query('SELECT*FROM categorias',(error,results)=>{

        if(error){
            console.error('Error al obtener categorias', error);
            res.status(500).json({
                error: "Error al obtener categorias",
            });
        }
        else{
            res.json(results);
        }
    });
};

const obtenerCategoriasPorId=(req,res) => {
    const id= req.params.id_categoria;
    connection.query('SELECT*FROM categorias WHERE id_categoria = ?',[id], (error, results)=>{

        if(error){
                res.status(500),json({error:"Ocurrio un error al obtener la categoria"});
        }
        else if(results.lenght==0){
            res.status(500).json({eror:"La categoria no fue encontrada"});
        }
        else{
            res.json(results[0]);
        }
    });
}

const eliminarCategoriasPorId=(req,res) => {
    const id= req.params.id_categoria;
    connection.query('DELETE FROM categorias WHERE id_categoria = ?',[id], (error, results)=>{

        if(error){
            console.error("Error al eliminar categoria", error);
            res.status(500),json({error:"Ocurrio un error al eliminar la categoria"});
        }
        else{
            res.json({message:"La categoria fue eliminada correctamente"});
        }
    });
}

const actualizarCategoriasPorId=(req,res) => {
    const id= req.params.id_categoria;
    const {nombre} = req.body;

    connection.query('UPDATE categorias SET nombre = ? WHERE id_categoria = ?', [nombre,id], (error, results)=>{
    
    if (error){
        console.error("Error al actualizar categoria", error);
        res.status(500).json({error:"Ocurrio un error al actualizar la categoria"});
    }
    else{
        res.json({message:"La categoria fue actualizada correctamente"});
    }
    });
}

const crearCategorias=(req,res) => {
    const {nombre} = req.body;
    connection.query('INSERT INTO categorias (nombre) VALUE (?)', [nombre], (error,results) => {
        if (error){
            console.error("Error al agregar categoria", error);
            res.status(500).json({error:"Error al agregar categoria"});
        }
        else{
            res.json ({message:"Cateoria agregada exitosamente"});
        }
    })
}

module.exports = {
    obtenerCategorias, 
    obtenerCategoriasPorId,
    eliminarCategoriasPorId,
    actualizarCategoriasPorId,
    crearCategorias,
}