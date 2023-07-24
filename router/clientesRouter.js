const express = require("express");

const clientesControllers = require("../controllers/clientesControllers");

const router = express.Router();

// !Rutas para las productos
router.get("/", clientesControllers.obtenerClientes);
router.get("/:id_cliente", clientesControllers.obtenerClientesPorId);
router.post("/", clientesControllers.crearCliente);
router.delete("/:id_cliente", clientesControllers.eliminarClientePorId);
router.put("/:id_cliente", clientesControllers.actualizarClientePorId);

module.exports = router;