import jwt from 'jsonwebtoken';

export default class ManejadorJWT{
    static secreto: string = 'LaClaveSecreta';  
    static validezSegundos: number = 60;

    static FirmarToken(payload : any){
        payload.expiracion = Math.floor(Date.now() / 1000) + ManejadorJWT.validezSegundos;
        var token = jwt.sign(payload, ManejadorJWT.secreto);
        return token;
    }

    static ExtraerPayload(token : any): null|any {
        let payload = null;
        try {
            payload = jwt.verify(token, ManejadorJWT.secreto);
            return payload;
        }catch{
            return null;
        }
    }

    static TokenExpirada(token : any):boolean{
        let payload = ManejadorJWT.ExtraerPayload(token);
        if (payload!==null){
            if (payload.expiracion < Math.floor(Date.now() / 1000)){
                return true;
            }else{
                return false;
            }
        }else{
            return false;
        }
    }

    static RenovarToken(token : any){
        let payload = ManejadorJWT.ExtraerPayload(token);
        if (payload!==null){
            if (payload.expiracion < Math.floor(Date.now() / 1000)){
                let token = ManejadorJWT.FirmarToken(payload);
                return token;
            }else{
                return null;
            }
        }else{
            return null;
        }
    }

}