import { AngularFireAuth } from 'angularfire2/auth';
import { Contact } from "../models/contact.model";
import { Injectable } from "@angular/core";
import { AngularFireDatabase, AngularFireObject } from "angularfire2/database";
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ContactService{
    
    contactoAuxiliar: Contact = null;
    contactos: Observable<Contact[]> = null;
    amigos: Observable<Contact[]> = null;
    contacto: AngularFireObject<Contact> = null;
    userId: string;

    constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth) {
        this.afAuth.authState.subscribe(user => {
          if(user) this.userId = user.uid;
        })
      }
    
      
    //Devuelve la lista de contactos de un usuario determinado
   /* getContactosUsuario(): Observable<Contact[]> {
        if (!this.userId) return;
        this.contactos = this.db.list<Contact>(`perfiles/${this.userId}/contactos`).valueChanges();
        return this.contactos;
    }*/

    async getContacto(id:string)
    {
      //this.contacto = this.db.object<Contact>(`perfil/${id}`);
      /*this.contacto.snapshotChanges().subscribe(async action => {
        console.log(action.payload.val())
          this.contactoAuxiliar = await action.payload.val();
          console.log(" AUX "+this.contactoAuxiliar)
          return await action.payload.val();
        });*/
        
      return this.db.object<Contact>(`perfil/${id}`);
    }
    //Devuelve todos los usuarios disponibles
    getContactos(): Observable<Contact[]> {
      this.contactos = this.db.list<Contact>(`perfil`, ref => ref.orderByChild(`nombre`)).valueChanges();
      return this.contactos;
    }

    //Devuelve los amigos de un usuario
    getAmigos(value:string): Observable<Contact[]> {
      return this.db.list<Contact>(`perfil`, ref => ref.orderByChild(`amigos/id`).equalTo(value)).valueChanges();
      //this.contactos = this.db.list<Contact>(`perfiles`);
    }

    

}