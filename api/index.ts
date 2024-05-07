import ConstructorEndpoints from "./backend/ConstructorEndpoints";
const express = require("express");
import { Request, Response } from 'express';
const app = express();
import path from "path"
import bodyParser from 'body-parser';

app.use(bodyParser.json());



app.get("/", 
    (req : Request, res : Response) => res.send(
        "<p>Proyecto Para Practica Profesional Supervisada UTN 2024</p> <p>Para ejecutar local: vercel dev</p> <p>Prueba Franco</p> <p>Prueba Federico</p>"
        +"<p>"+ path.join(__dirname, '/frontend')+ "</p>"
    )
);


var registrador: ConstructorEndpoints = new ConstructorEndpoints(app);



app.listen(3050, () => console.log("Server ready on port 3000."));

module.exports = app;


