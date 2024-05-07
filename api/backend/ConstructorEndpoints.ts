import endpointPrueba from "./Ejemplo";
import ManejadorJWT from "./JWT";
import {Usuario} from './Entidades';
import { ActiveRecord } from "./ActiveRecord";
import { Application, Request, Response } from 'express';
import express from "express";
import path from "path"
import {logear} from "./EndpointsUsuario"
import { javascriptUrls } from "./EndpoitsDirecciones";

export default class ConstructorEndpoints {
    app : any;
    constructor(app : Application){
        this.app=app;
        this.registrarEndPoints();
    }

    public registrarEndPoints(){
        /*Registra Archivos estaticos de FrontEnd en la ruta raiz*/
        this.app.use(express.static(path.join(__dirname, '../frontend')));

        /*Endpoints usuarios*/
        //this.app.post("/api/login", logear);


        /*Endpoint para generacion de clase javascript con url*/
        this.app.get("/claseUrls",javascriptUrls);







        this.app.get("/pruebajwt", 
            (req : Request, res : Response)=>{
                res.send(
                    ManejadorJWT.ExtraerPayload('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub21icmUiOiJob3JhY2lvIiwiYXBlbGxpZG8iOiJzZXJyYW5vIiwiZXhwaXJhY2lvbiI6MTcxMzkyMzYyOSwiaWF0IjoxNzEzOTIzNTY5fQ.NBx3dp48RtVknTf4r5KJrRXKS30145SK2f_k3t5DzaM')
                )
        });
        /*
        this.app.get("/ejemploLeer",
            (req : Request, res : any)=>{
                let u = new Usuario();
                u.usu_id=8;
                u.leer()
                .then(res.send(u))
                .catch(x=>res.send(x));
            }
        );
        
        this.app.get(
            "/ejecutarSQL",
            (req : Request, res : any)=>{
                console.log(req.query.consulta)
                ActiveRecord.ejecutarSQLPublico(req.query.consulta as string)
                .then(x=>{res.send(x)})
                .catch(x=>{res.send(x)});
            }
        )
        */
    }
}