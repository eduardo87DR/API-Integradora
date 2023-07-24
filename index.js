//!DEPENDENCIAS
const express = require('express');
const cors = require('cors');
const categoriasRouter = require('./router/categoriasRouter');
const productosRouter = require('./router/productosRouter');
const administradoresRouter = require('./router/administradoresRouter');
const clientesRouter = require('./router/clientesRouter');


//app va a tener todos los atributos y metodos de express
//trae y mete los elementos de require
const app = express(); 

app.use(cors());

app.use(express.json());

//RUTA AL ROUTER
app.use("/categorias", categoriasRouter);
app.use("/productos", productosRouter);
app.use("/administradores", administradoresRouter);
app.use("/clientes", clientesRouter);


app.get("/", (req, res) => {
    res.send("<h1>Hola, soy una persona completamente normal, no añadas /lucario/insert en el link de arriba</h1>");
}) 

app.get('/lucario/insert', (req, res) => {
    res.send("<h1>Estoy cansado de la bromita de Vaporeon. Solo lo dicen porque es un meme extendido pero estoy seguro que a nadie le atrae ni mínimamente Vaporeon. Ya cansan, hay Pokemon mucho más atractivos, Incineroar es muchísimo más sexy, Lucario, Urshifu o Machoke. Ni que decir de Greninja o Buzzwole, aunque mí favorito sin duda sería Lucario. Todos ellos son muchísimo más atractivos pero siempre tienen que estar con el meme de Vaporeon y estoy seguro de que si tuvieran la oportunidad no tendrían sexo con ella. Pero yo si puedo decir que si tendría sexo con cualquiera de los que mencioné, no soy hipócrita. Especialmente con Lucario</h1>");
})  //{} es la funcion

app.listen(3001, () => {
    console.log("API escuchando por el puerto 3001");
})