import ConstructorEndpoints from "./backend/ConstructorEndpoints";
const express = require("express");
import { Request, Response } from 'express';
const app = express();
import path from "path"
import bodyParser from 'body-parser';

app.use(bodyParser.json());

app.post('/api/login', function (req:any, res:any, next:any) {
    console.log('middleware');
    console.log(req.body)
    res.json(req.body)
  })

app.post('/api/login', function (req:any, res:any) {
    console.log('EP')
  });




app.get("/", 
    (req : Request, res : Response) => res.send(
        "<p>Proyecto Para Practica Profesional Supervisada UTN 2024</p> <p>Para ejecutar local: vercel dev</p> <p>Prueba Franco</p> <p>Prueba Federico</p>"
        +"<p>"+ path.join(__dirname, '/frontend')+ "</p>"
    )
);


var registrador: ConstructorEndpoints = new ConstructorEndpoints(app);



app.listen(3001, () => console.log("Server ready on port 3001."));

module.exports = app;


