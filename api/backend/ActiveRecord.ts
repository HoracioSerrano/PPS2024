import pg from 'pg'
const { Pool } = pg

export class Registro {
    [key: string]: any;
    constructor() {}
}

export abstract class ActiveRecord extends Registro{
    protected abstract DATABASE : string;
    protected abstract SCHEMA : string;
    protected abstract TABLE : string;
    protected abstract PK : string;
    protected LEIDO : boolean = false;

    constructor(){
        super();
    }
  
    protected ListaPropiedades() : string[] {
        return Object.getOwnPropertyNames(this).filter(x => x !== 'SCHEMA' && x!== 'LEIDO' && x !== 'PK' && x !== 'TABLE' && x !== 'DATABASE').sort();
    }

    protected get Valor_Miembro_PK(){
        return this[this.PK];
    }

    protected set Valor_Miembro_PK(valor){
        this[this.PK]=valor;        
    }    

    protected get Valores_Miembros_No_PK(){
        let pro : string[] = this.ListaPropiedades();
        pro = pro.filter( ( x : string) =>{ return (x !== this.PK)} );
        pro = pro.map( x => this[x]);
        return pro;
    }

    protected get Valores_Miembros(){
        let pro : string[] = this.ListaPropiedades();
        pro = pro.map( x => this[x]);
        return pro;
    }

    protected configurarDesdeObjeto(objeto:any){
        Object.getOwnPropertyNames(objeto).forEach( prop => {
            this[prop]=objeto[prop];
            this.LEIDO=true;
        });
    }

    protected SelectSQL_PostGre() : string {
        let str = `select * from ${this.TABLE} where ${this.PK} = $1 `;      
        return str;
    }

    protected UpdateSQL_PostGre() : string {
        let str = `update ${this.TABLE} set `; 
        let props = this.ListaPropiedades();
        let contador = 1;
        for (let index = 0; index < props.length; index++) {
            if(props[index] !== this.PK){
                if (index < props.length-1){
                    //ultimo
                    str = str + ` ${props[index]} = $${contador}, `;
                    contador++;
                }else{
                    str = str + ` ${props[index]} = $${contador} `;
                    contador ++;
                }  
            }                         
        }
        str = str + ` where ${this.PK} = $${contador} `;      
        return str;
    }

    protected InsertSQL_PostGre( id : number| null = null ) : string {
        let str = `insert into ${this.TABLE} `;
        let props = this.ListaPropiedades();
        let str1 = ' ('
        let str2 = ' values ('
        let contador = 1;
        for (let index = 0; index < props.length; index++) {
            if(props[index] !== this.PK || id !== null){
                if (index < props.length-1){
                    //ultimo
                    str1 = str1 + ` ${props[index]}, `;
                    str2 = str2 + ` $${contador}, `;
                    contador++;
                }else{
                    str1 = str1 + ` ${props[index]}) `;
                    str2 = str2 + ` $${contador} ) `;
                    contador++;
                }  
            }                         
        }
        return str+str1+str2+ (' RETURNING '+this.PK);
    }

    protected DeleteSQL_PostGre() : string {
        let str = `delete from ${this.TABLE} where ${this.PK} = $1`;      
        return str;
    }

    protected crearPool(){
        const pool = new Pool({
            connectionString: "postgres://default:JC2Mzcx9SGlV@ep-noisy-hat-a4y582h9-pooler.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require"
        });
        return pool;
    }

    protected async ejecutarSQL(query:string, parameters?:any[]){
        let pool = this.crearPool();
        let cliente = await pool.connect();
        let resultado:any = await cliente.query(query,parameters);
        await cliente.release();
        await pool.end();
        return resultado; 
    }

    public async leer(){
        let resultado = await this.ejecutarSQL(this.SelectSQL_PostGre(), [this.Valor_Miembro_PK]);
        let objeto = resultado.rows[0];
        this.configurarDesdeObjeto(resultado.rows[0]);
    }

    protected async insertar(){
        let resultado = await this.ejecutarSQL(this.InsertSQL_PostGre(), this.Valores_Miembros_No_PK);
        this[this.PK]=resultado.rows[0][this.PK];
        this.LEIDO=true;
    }

    protected async actualizar(){
        let miembros = this.Valores_Miembros_No_PK;
        miembros.push(this.Valor_Miembro_PK);
        await this.ejecutarSQL(this.UpdateSQL_PostGre(), miembros);       
    }

    public async grabar(){
        if(this.LEIDO==true && this[this.PK]!==null){
            if(typeof this[this.PK] === 'number'){
                if(Number.isInteger(Number(this[this.PK]))){
                    await this.actualizar();
                }
            }          
        }else{
            if(this[this.PK]==null && this.LEIDO==false){
                await this.insertar();
            }else{
                throw ('Error en el ID del Objeto');
            }
        }
    }

    public async eliminar(){
        if(this[this.PK]!==null){
            if(typeof this[this.PK] === 'number'){
                if(Number.isInteger(Number(this[this.PK]))){
                    await this.ejecutarSQL(this.DeleteSQL_PostGre(),[this.Valor_Miembro_PK]);
                }
            }          
        }
    }


    static async ejecutarSQLPublico(query:string, parameters?:any[]){
        const pool = new Pool({
            connectionString: "postgres://default:JC2Mzcx9SGlV@ep-noisy-hat-a4y582h9-pooler.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require"
        });
        let cliente = await pool.connect();
        let resultado:any = await cliente.query(query,parameters);
        await cliente.release();
        await pool.end();
        return resultado; 
    }
}

