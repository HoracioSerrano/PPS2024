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

export class Instrumento extends ActiveRecord {
    protected SCHEMA: string = 'public';
    protected DATABASE: string = 'verceldb';
    protected TABLE: string = 'Instrumento';
    protected PK: string = 'ins_id';

    ins_id: number | null = null;
    ins_descripcion: string | null = null;

    constructor() {
        super();
    }
}

export class Perfil extends ActiveRecord {
    protected SCHEMA: string = 'public';
    protected DATABASE: string = 'verceldb';
    protected TABLE: string = 'Perfil';
    protected PK: string = 'per_id';

    per_id: number | null = null;
    per_ins_id_instrumento: number | null = null;
    per_usu_id: number | null = null;
    per_nombre: string | null = null;
    per_apellido: string | null = null;
    per_ubicacion: any = null; // Assuming per_ubicacion is an object
    per_fechaDeNacimiento: Date | null = null;
    per_fotoDePerfil: any = null; // Assuming per_fotoDePerfil is an object
    per_buscandoBanda: boolean | null = null;
    per_informacionAdicional: string | null = null;
    per_esRepresentante: boolean | null = null;

    constructor() {
        super();
    }
}

export class Perfil_Instrumentos extends ActiveRecord {
    protected SCHEMA: string = 'public';
    protected DATABASE: string = 'verceldb';
    protected TABLE: string = 'Perfil_Instrumentos';
    protected PK: string = 'pei_id';

    pei_id: number | null = null;
    pei_per_id_perfil: number | null = null;
    pei_ins_id_instrumento: Instrumento | null = null;

    constructor() {
        super();
    }
}

export class GeneroMusical extends ActiveRecord {
    protected SCHEMA: string = 'public';
    protected DATABASE: string = 'verceldb';
    protected TABLE: string = 'GeneroMusical';
    protected PK: string = 'gem_id';

    gem_id: number | null = null;
    gem_descripcion: string | null = null;

    constructor() {
        super();
    }
}

export class Banda extends ActiveRecord {
    protected SCHEMA: string = 'public';
    protected DATABASE: string = 'verceldb';
    protected TABLE: string = 'Banda';
    protected PK: string = 'ban_id';

    ban_id: number | null = null;
    ban_per_id_representante: number | null = null;
    ban_gem_id_genero_musical: number | null = null;
    ban_nombre: string | null = null;
    ban_logo: any = null; // Assuming ban_logo is an object
    ban_ubicacion: any = null; // Assuming ban_ubicacion is an object
    ban_informacionAdicional: string | null = null;

    constructor() {
        super();
    }
}

export class Busqueda extends ActiveRecord {
    protected SCHEMA: string = 'public';
    protected DATABASE: string = 'verceldb';
    protected TABLE: string = 'Busqueda';
    protected PK: string = 'bus_id';

    bus_id: number | null = null;
    bus_ban_id_banda: number | null = null;
    bus_ins_id_instrumento: number | null = null;
    bus_activa: boolean | null = null;

    constructor() {
        super();
    }
}

export class Postulacion extends ActiveRecord {
    protected SCHEMA: string = 'public';
    protected DATABASE: string = 'verceldb';
    protected TABLE: string = 'Postulacion';
    protected PK: string = 'pos_id';

    pos_id: number | null = null;
    pos_usu_id_postulante: number | null = null;
    pos_bus_id_buqueda: number | null = null;
    sol_detalle: string | null = null;
    sol_estado: string | null = null;
    sol_fecha: Date | null = null;

    constructor() {
        super();
    }
}

export class Audicion extends ActiveRecord {
    protected SCHEMA: string = 'public';
    protected DATABASE: string = 'verceldb';
    protected TABLE: string = 'Audicion';
    protected PK: string = 'aud_id';

    aud_id: number | null = null;
    aud_ban_id_banda: number | null = null;
    aud_usu_id_musico: number | null = null;
    aud_fechaAudicion: Date | null = null;

    constructor() {
        super();
    }
}

export class Confirmacion_Banda extends ActiveRecord {
    protected SCHEMA: string = 'public';
    protected DATABASE: string = 'verceldb';
    protected TABLE: string = 'Confirmacion_Banda';
    protected PK: string = 'cob_id';

    cob_id: number | null = null;
    cob_aud_id_confirmacion_banda_audicion: number | null = null;
    cob_aprobado: boolean | null = null;
    cob_fecha: Date | null = null;

    constructor() {
        super();
    }
}

export class Confirmacion_Musico extends ActiveRecord {
    protected SCHEMA: string = 'public';
    protected DATABASE: string = 'verceldb';
    protected TABLE: string = 'Confirmacion_Musico';
    protected PK: string = 'com_id';

    com_id: number | null = null;
    com_cob_id_confirmacion_musico_confirmacion_banda: number | null = null;
    com_aprobado: boolean | null = null;
    com_fecha: Date | null = null;

    constructor() {
        super();
    }
}

export class Estado extends ActiveRecord {
    protected SCHEMA: string = 'public';
    protected DATABASE: string = 'verceldb';
    protected TABLE: string = 'Estado';
    protected PK: string = 'est_id';

    est_id: number | null = null;
    est_estado: string | null = null;

    constructor() {
        super();
    }
}

export class Reporte extends ActiveRecord {
    protected SCHEMA: string = 'public';
    protected DATABASE: string = 'verceldb';
    protected TABLE: string = 'Reporte';
    protected PK: string = 'rep_id';

    rep_id: number | null = null;
    rep_usu_id_denunciante: number | null = null;
    rep_usu_id_denunciado: number | null = null;
    rep_estado_id_reporte: number | null = null;
    rep_detalle: string | null = null;
    rep_fecha: Date | null = null;
    rep_fecha_estado: Date | null = null;

    constructor() {
        super();
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
