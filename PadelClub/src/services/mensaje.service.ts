import { Mensaje } from "../models/mensaje.model";
import { Injectable } from "@angular/core";
import { AngularFireList, AngularFireDatabase } from "angularfire2/database";


@Injectable()
export class MensajeService{

    
    mensajes:AngularFireList<Mensaje> =null;
    chatId: string;
    
    constructor(private db:AngularFireDatabase){
    }
    getMensajes(chatId):AngularFireList<Mensaje>{
        this.mensajes=this.db.list<Mensaje>(`mensajes/${chatId}`);
        return this.mensajes;
    }
    addMensaje(value: Mensaje, chatId){
        this.mensajes=this.db.list<Mensaje>(`mensajes/${chatId}`);
        return this.mensajes.push(value);
    }

    

}