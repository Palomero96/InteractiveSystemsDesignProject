export interface Contact{
    key?: string;  //Manejara el id cuando se utiliza firebase
    id:string;
    nombre:string;
    apellidos:string;
    edad: number;
    nivel:string;
    rol:string;
    email:string;
}