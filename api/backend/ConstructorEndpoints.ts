import endpointPrueba from "./Ejemplo";
import ManejadorJWT from "./JWT";

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

    }
}