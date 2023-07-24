const express =require('express');

const categoriasControllers = require("../controllers/categoriasControllers");

const router = express.Router();

//Ruta para las categorias
router.get('/', categoriasControllers.obtenerCategorias);
router.get('/:id_categoria', categoriasControllers.obtenerCategoriasPorId);
router.delete('/:id_categoria', categoriasControllers.eliminarCategoriasPorId);
router.post('/', categoriasControllers.crearCategorias);
router.put('/:id_categoria', categoriasControllers.actualizarCategoriasPorId);


module.exports = router;