import { Application, Request, Response } from 'express';
import express from "express";

export function javascriptUrls(req:Request, res:Response){
    const urlProduccion = "https://pps-2024-utn.vercel.app";
    const urlDesarrollo = "http://localhost:3000";
    let urlBase = urlDesarrollo;
    if (process.env.AMBIENTE == 'produccion'){
        urlBase = urlProduccion;
    }
    res.setHeader('Content-Type', 'text/javascript');

    const clase = `
        class Urls{
            constructor(){
            }
            static base=${'"'+urlBase+'"'};
            static login=${'"'+urlBase+'/api/login"'};
            static index=${'"'+urlBase+'/index.html"'};
        }
        
    `
    res.send(clase);
}