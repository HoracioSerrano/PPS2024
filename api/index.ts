import ConstructorEndpoints from "./backend/ConstructorEndpoints";
const express = require("express");
const app = express();

app.get("/", (req, res) => res.send("<p>Proyecto Para Practica Profesional Supervisada UTN 2024</p> <p>Para ejecutar local: vercel dev</p> <p>Prueba Franco</p> <p>Prueba Federico</p>"));



var registrador: ConstructorEndpoints = new ConstructorEndpoints(app);



app.listen(3000, () => console.log("Server ready on port 3000."));

module.exports = app;