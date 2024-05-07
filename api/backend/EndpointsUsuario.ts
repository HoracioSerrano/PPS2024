import endpointPrueba from "./Ejemplo";
import ManejadorJWT from "./JWT";
import {Usuario} from './Entidades';
import { ActiveRecord } from "./ActiveRecord";
import { Application, Request, Response } from 'express';
import express from "express";
import path from "path";


export function logear (req: Request, res:Response){
    let u = new Usuario();
    u.usu_email=req.body.usu_email;
    u.leerPorEmail()
    .then(x=>{
        if(u.usu_email==req.body.usu_email){
            let token = ManejadorJWT.FirmarToken(u);
            res.cookie('JWT', token, { maxAge: 300000, httpOnly: true} );
            res.send('Token Creada');
        }else{
            res.status(401).send('Usuario o Contraseña Incorrectos');
        }
    });
}