import { Clase } from "../models/clase.model";
import { Injectable } from "@angular/core";
import { AngularFireDatabase, AngularFireList, AngularFireObject} from 'angularfire2/database';

@Injectable()

export class ClaseService{
    clases:AngularFireList<Clase> =null;
    claseUser:AngularFireList<Clase> =null;
    Usuario: string;
    constructor(private db:AngularFireDatabase){
    }
    getAllClase():AngularFireList<Clase>{
        this.clases=this.db.list<Clase>("clase");
        return this.clases;
    }
    addMensaje(value: Clase, Usuario){
        this.clases=this.db.list<Clase>("clase");
        return this.clases.push(value);
    }
    //Metodo para recuperar las Clase de un Usuario
    //No estoy seguro de que funcione, deberia de recuperar los datos de las Clase de un usuario 
    getUserClases(Usuario):AngularFireList<Clase>{ 
        this.clases = this.db.list('clase', ref => ref.orderByChild('userid').equalTo(Usuario));
        return this.clases;
    }

}