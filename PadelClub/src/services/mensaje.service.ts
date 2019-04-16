import { Mensaje } from "../models/mensaje.model";
import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "angularfire2/database";

@Injectable()
export class MensajeService{


    private mensajeRef=this.db.list<Mensaje>('AgendaFirebase');


    constructor(private db:AngularFireDatabase){
    }
    addContact(value: Mensaje){
    //this.contacts.push(value);
    return this.mensajeRef.push(value);
    }
    getMensajes(){
        //return this.contacts;
        return this.mensajeRef;
    }

    updateMensaje(value: Mensaje){
        return this.mensajeRef.update(value.key,value);
    }
    removeMensaje(value: Mensaje){
        return this.mensajeRef.remove(value.key);
    }

}