

export interface Clase{
    claseid: string;  //Manejara el id cuando se utiliza firebase
    profesor:string;
    plazasmax:number;
    numeroactual:number;
    fechaini: string;
    fechafin: string;
    nivel: string;
    dia: string;
    hora: string;
    pista:number; //En nuestro caso habra dos pistas
    //alumnos: //Parecido a los contacto. Cuando este lo de los contactos se hace la clase servicio
}