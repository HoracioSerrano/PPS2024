import endpointPrueba from "./Ejemplo";
import ManejadorJWT from "./JWT";
import {Usuario} from './Entidades';
import { ActiveRecord } from "./ActiveRecord";

export default class ConstructorEndpoints {
    app : any;
    constructor(app){
        this.app=app;
        this.registrarEndPoints();
    }

    public registrarEndPoints(){
        this.app.get("/ejemplo", (req, res) => res.send(endpointPrueba()));

        this.app.get("/pruebajwt", 
            (req,res)=>{
                res.send(
                    ManejadorJWT.ExtraerPayload('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub21icmUiOiJob3JhY2lvIiwiYXBlbGxpZG8iOiJzZXJyYW5vIiwiZXhwaXJhY2lvbiI6MTcxMzkyMzYyOSwiaWF0IjoxNzEzOTIzNTY5fQ.NBx3dp48RtVknTf4r5KJrRXKS30145SK2f_k3t5DzaM')
                )
        });

        /*Active Record*/
        this.app.get("/ejemploLeer",
            (req, res)=>{
                let u = new Usuario();
                u.usu_id=8;
                u.leer()
                .then(res.send(u))
                .catch(x=>res.send(x));
            }
        );
        
        this.app.get(
            "/ejecutarSQL",
            (req,res)=>{
                console.log(req.query.consulta)
                ActiveRecord.ejecutarSQLPublico(req.query.consulta)
                .then(x=>{res.send(x)})
                .catch(x=>{res.send(x)});
            }
        )
    }
}