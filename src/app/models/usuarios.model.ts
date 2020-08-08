import { environment } from 'src/environments/environment';
const base_url = environment.base_url;
export class Usuario{
    constructor(
        public nombre: string,
        public email: string,
        public password?: string,
        public img?: string,
        public google?: boolean,
        public role?:string,
        public uid?:string,
    ){
    }

    imprimir(){
        console.log(this.nombre);
        console.log(this.email);
        console.log(this.password);
        console.log(this.img);
        console.log(this.google);
        console.log(this.role);
        console.log(this.uid);
    }

    get imagenUrl(){

        if( this.img ){
            if( this.img.includes('http') ){
                return this.img;
            }else{
                return `${base_url}/uploads/usuarios/${this.img}`;
            }
        }else{
            return `${base_url}/uploads/usuarios/no-image`;
        }
    }
}