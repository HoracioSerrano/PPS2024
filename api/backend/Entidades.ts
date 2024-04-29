import {Registro, ActiveRecord} from './ActiveRecord'

export class Usuario extends ActiveRecord {
    protected SCHEMA = 'public';
    protected DATABASE = 'verceldb';
    protected TABLE = 'Usuario';
    protected PK = 'usu_id';
    usu_id: number|null =null;
    usu_email: string | null=null;
    usu_password: string | null=null;
    usu_administrador: boolean| null=null;
    usu_bloqueado: boolean| null=null;
    usu_bloqueado_fecha: Date | null=null;
    usu_bloqueado_usu_id: number | null=null;
    constructor(){
        super();
    }

    public async leerPorEmail():Promise<Usuario[]>{
        let resultado = await this.ejecutarSQL('select * from Usuario where usu_email=$1',[this.usu_email]);
        return resultado.rows.map((res:any)=>{
            let u = new Usuario();
            u.configurarDesdeObjeto(res);
            return u;
        });
    }

}



async function pruebaLeer() {
    let u = new Usuario();
    u.usu_id=8;
    await u.leer();
    console.log(u);
}
pruebaLeer();

async function pruebaInsertar() {
    let u = new Usuario();
    u.usu_bloqueado=false;
    u.usu_administrador=false;
    u.usu_email='horacioSerrano@gmail.com';
    u.usu_password='dfarea151'
    await u.grabar();
    console.log(u);
}
//pruebaInsertar();

async function pruebaLeerPorEmail() {
    let u = new Usuario();
    u.usu_email='jfiajfalkdjfiadfijaldifja@gmail.com';
    let usuarios = await u.leerPorEmail();
    console.log(usuarios);
}
pruebaLeerPorEmail();




async function pruebaupdate() {
    let u = new Usuario();
    u.usu_id=7;
    await u.leer();
    u.usu_email='77@gmail.com';
    u.usu_password=null;
    await u.grabar();
    console.log(u);
}
//pruebaupdate();


async function eliminar() {
    let u = new Usuario();
    u.usu_id=7;
    await u.eliminar();
}
//eliminar();
