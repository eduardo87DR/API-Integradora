const connection = require("../database");

const obtenerProductos = (req, res) => {
    connection.query(
      "SELECT productos.*, categorias.nombre AS nombre_categoria FROM productos JOIN categorias ON productos.categoria = categorias.id_categoria ORDER BY productos.id_producto",
      (error, results) => {
        if (error) {
          console.error("Error al obtener productos", error);
          res.status(500).json({
            error: "Error al obtener productos",
          });
        } else {
          // Aquí NO asignamos producto.nombre_categoria al campo categoria, sino producto.categoria (que es el ID)
          const productosSinCategoria = results.map((producto) => ({
            ...producto,
            // Aquí puedes eliminar el campo "nombre_categoria", ya que no lo necesitas en el frontend
            nombre_categoria: undefined,
          }));
          res.json(productosSinCategoria);
        }
      }
    );
  };
  
  







const obtenerProductosPorId = (req, res) => {
    const id = req.params.id_producto;
    connection.query("SELECT * FROM productos WHERE id_producto =?", [id], (error, results) => {
        if (error) {
            res.status(500).json({ error: "Ocurrio un error al obtener el producto" });
        } else if (results.length === 0) {
            res.status(500).json({ error: "El producto no fue encontrado" });
        }
        else {
            res.json(results[0]);
        }
    });
};





const crearProductos = (req, res) => {
    const { nombre, descripcion, precio, imagen, stock, categoria } = req.body;

    connection.query(
        "INSERT INTO productos (nombre, descripcion, precio, imagen, stock, categoria) VALUES (?,?,?,?,?,?)",
        [nombre, descripcion, precio, imagen, stock, categoria],
        (error, results) => {
            if (error) {
                console.error("Errors al agregar producto", error);
                res.status(500).json({
                    error: "Error al agregar producto",
                });
            } else {
                res.json({ message: "Producto agregado" });
            }
        }
    );
};


const actualizarProductosPorId = (req, res) => {
    const id = req.params.id_producto;
    const { nombre, descripcion, precio, imagen, stock, categoria } = req.body;
    connection.query(
        "UPDATE productos SET nombre =?, descripcion = ?, precio=?, imagen=?, stock=?, categoria=? WHERE id_producto =?", [nombre, descripcion, precio, imagen, stock, categoria,  id], (error, results) => {
            if (error) {
                console.error("Error al actualizar producto", error);
                res.status(500).json({ error: "Error al actualizar producto" });
            } else {
                res.json({ message: "El producto fue actualizada correctamente" });
            }
        }
    );
};

const eliminarProductosPorId = (req, res) => {
    const id = req.params.id_producto;
    connection.query("DELETE FROM productos WHERE id_producto =?", [id], (error, results) => {
        if (error) {
            res.status(500).json({ error: "Ocurrio un error al eliminar el producto" });
        } else {
            res.json({ message: "El producto fue eliminada correctamente" });
        }
    });
}

module.exports = {
    obtenerProductos,
    obtenerProductosPorId,
    crearProductos,
    actualizarProductosPorId,
    eliminarProductosPorId,
};