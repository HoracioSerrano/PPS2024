import endpointPrueba from "./Ejemplo";
import ManejadorJWT from "./JWT";
import {Usuario} from './Entidades';
import { ActiveRecord } from "./ActiveRecord";
import { Application, Request, Response } from 'express';
import express from "express";
import path from "path";


export function logear (req: Request, res:Response, next:any){
    console.log(req.body)
    //console.json(req.body)
    
    
    /*
    console.log('request =' + JSON.stringify(req.body));
    const usu : string =  req.body.usu_email;                
    const pas : string =  req.body.usu_password;
    console.log("usu: " + usu);
    console.log("pas: " + pas);*/
}