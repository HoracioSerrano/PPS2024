import endpointPrueba from "./Ejemplo";

export default class ConstructorEndpoints {
    app : any;
    constructor(app){
        this.app=app;
        this.registrarEndPoints();
    }

    public registrarEndPoints(){
        this.app.get("/ejemplo", (req, res) => res.send(endpointPrueba()));
    }
}