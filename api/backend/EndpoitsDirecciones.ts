import { Application, Request, Response } from 'express';
import express from "express";

export function javascriptUrls(req:Request, res:Response){
    const urlProduccion = "https://pps-2024-utn.vercel.app";
    const urlDesarrollo = "http://localhost:3000";
    res.setHeader('Content-Type', 'text/javascript');

    const clase = `
        class Urls{
            constructor(){
            }
            static url=${process.env.AMBIENTE == 'produccion'? '"https://pps-2024-utn.vercel.app"' : '"http://localhost:3000"'};
        }
        
    `
    res.send(clase);
}