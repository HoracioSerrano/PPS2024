const express = require("express");
const app = express();

app.get("/", (req, res) => res.send("Proyecto Para Practica Profesional Supervisada UTN 2024"));

app.listen(3000, () => console.log("Server ready on port 3000."));

module.exports = app;