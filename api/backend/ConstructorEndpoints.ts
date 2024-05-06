import endpointPrueba from "./Ejemplo";
import ManejadorJWT from "./JWT";
import {Usuario} from './Entidades';
import { ActiveRecord } from "./ActiveRecord";
import { Application, Request, Response } from 'express';
import express from "express";

export default class ConstructorEndpoints {
    app : any;
    constructor(app : Application){
        this.app=app;
        this.registrarEndPoints();
    }

    public registrarEndPoints(){
        /*Registra Archivos estaticos de FrontEnd en la ruta raiz*/
        this.app.use(express.static('api/frontend'));

        this.app.get("/ejemplo", (req : Request, res : Response) => res.send(endpointPrueba()));

        this.app.get("/pruebajwt", 
            (req : Request, res : Response)=>{
                res.send(
                    ManejadorJWT.ExtraerPayload('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub21icmUiOiJob3JhY2lvIiwiYXBlbGxpZG8iOiJzZXJyYW5vIiwiZXhwaXJhY2lvbiI6MTcxMzkyMzYyOSwiaWF0IjoxNzEzOTIzNTY5fQ.NBx3dp48RtVknTf4r5KJrRXKS30145SK2f_k3t5DzaM')
                )
        });

        /*Active Record*/
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
    }
}