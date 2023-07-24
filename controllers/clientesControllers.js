const connection = require("../database");

const obtenerClientes = (req, res) => {
    connection.query("SELECT * FROM clientes", (error, results) => {
        
        if (error) {
            console.error("Errors al obtener clientes", error);
            res.status(500).json({
                error: "Error al obtener clientes",
            });
        } else {
            res.json(results);
        }
    });
};


const obtenerClientesPorId = (req, res) => {
    const id = req.params.id_cliente;
    connection.query("SELECT * FROM clientes WHERE id_cliente =?", [id], (error, results) => {
        if (error) {
            res.status(500).json({ error: "Ocurrio un error al obtener el cliente" });
        } else if (results.length === 0) {
            res.status(500).json({ error: "El cliente no fue encontrado" });
        }
        else {
            res.json(results[0]);
        }
    });
};



const crearCliente = (req, res) => {
    const { nombre, email, contrasena, direccion, ciudad, estado, pais } = req.body;

    connection.query(
        "INSERT INTO productos (nombre, contrasena, direccion, ciudad, estado, pais) VALUES (?,?,?,?,?,?)",
        [nombre, contrasena, direccion, ciudad, estado, pais],
        (error, results) => {
            if (error) {
                console.error("Errors al agregar cliente", error);
                res.status(500).json({
                    error: "Error al agregar cliente",
                });
            } else {
                res.json({ message: "Cliente agregada" });
            }
        }
    );
};


const actualizarClientePorId = (req, res) => {
    const id = req.params.id_cliente;
    const { nombre, email, contrasena, direccion, ciudad, estado, pais } = req.body;
    connection.query(
        "UPDATE clientes SET nombre =?, email = ?, contrasena=?, direccion=?, ciudad=?, estado=?, pais=? WHERE id_cliente =?", [nombre, email, contrasena, direccion, ciudad, estado, pais, id], (error, results) => {
            if (error) {
                console.error("Error al actualizar cliente", error);
                res.status(500).json({ error: "Error al actualizar cliente" });
            } else {
                res.json({ message: "El cliente fue actualizado correctamente" });
            }
        }
    );
};

const eliminarClientePorId = (req, res) => {
    const id = req.params.id_cliente;
    connection.query("DELETE FROM clientes WHERE id_cliente =?", [id], (error, results) => {
        if (error) {
            res.status(500).json({ error: "Ocurrio un error al eliminar el cliente" });
        } else {
            res.json({ message: "El cliente fue eliminado correctamente" });
        }
    });
}

module.exports = {
    obtenerClientes,
    obtenerClientesPorId,
    crearCliente,
    actualizarClientePorId,
    eliminarClientePorId,
};