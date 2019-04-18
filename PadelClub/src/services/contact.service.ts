import { AngularFireAuth } from 'angularfire2/auth';
import { Contact } from "../models/contact.model";
import { Injectable } from "@angular/core";
import { AngularFireList, AngularFireDatabase, AngularFireObject } from "angularfire2/database";
import { List } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { FirebaseDatabase } from '@firebase/database-types';


@Injectable()
export class ContactService{
    
    contactos: Observable<Contact[]> = null;
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

    //Devuelve todos los usuarios disponibles
    getContactos(): Observable<Contact[]> {
      this.contactos = this.db.list<Contact>(`perfiles`, ref => {
        let q =ref.orderByChild('nombre')
        return q;
      }).valueChanges();
      //this.contactos = this.db.list<Contact>(`perfiles`);
      return this.contactos;
    }

    /*
    Esto no hay que hacerlo asi, se hace solo por firebase
    removeContact(value: Contact)
    {
        this.contactos = this.db.list<Contact>('contactos/${this.userId}');
        return this.contactos.remove(value.id);
    }*/
    
    /*El concepto que utilizamos para añadir o eliminar contactos a la lista es como si fuesen canales
    de forma que el usuario se vincula o desvincula de un contacto ya creado, de esta forma, los contactos
    se crearan al darse de alta el usuario, para que cada usuario de de alta su contacto*/
    //Sirve para que otros contactos puedan añadir el mismo contacto
    /*join(contactKey) {
        const data = { [this.userId]: true};
        const amigos = this.db.object('contactos/${contactKey}/amigos');
        return amigos.update(data);
      }

    //Para que otros usuarios puedan eliminar el contacto
    leave(contactKey) {
        const amigo = this.db.object('contactos/${contactKey}/amigos/${this.userId}');
        return amigo.remove();
      }
    /*
    addContact(value: Contact)
    {
    //this.contacts.push(value);
    return this.contactsRef.push(value);
    }

    getContacts()
    {
        //return this.contacts;
        return this.contactsRef;
    }

    updateContact(value: Contact)
    {
        return this.contactsRef.update(value.key,value);
    }

    removeContact(value: Contact)
    {
        return this.contactsRef.remove(value.key);
    }
    */

}