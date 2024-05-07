import { Application, Request, Response } from 'express';
import express from "express";

export function javascriptUrls(req:Request, res:Response){
    res.setHeader('Content-Type', 'text/javascript');
    res.send(process.env.AMBIENTE);
}