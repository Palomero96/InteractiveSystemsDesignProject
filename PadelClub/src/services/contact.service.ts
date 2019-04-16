import { Contact } from "../models/contact.model";
import { Injectable } from "@angular/core";
import { AngularFireDatabase, AngularFireList, AngularFireObject} from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class ContactService{


    private contactsRef=this.db.list<Contact>('AgendaFirebase');
    contactos: AngularFireList<Contact> = null;
    contacto: AngularFireObject<Contact> = null;
    userId: string;

    constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth) {
        this.afAuth.authState.subscribe(user => {
          if(user) this.userId = user.uid;
        })
      }
    
    //Devuelve la lista de contactos de un usuario determinado
    getItemsList(): AngularFireList<Contact> {
        if (!this.userId) return;
        this.contactos = this.db.list<Contact>('contactos/${this.userId}');
        return this.contactos;
    }
    //Al añadir el contacto se asocia directamente al usuario que lo ha creado
    addContacto(contacto: Contact)  {
        return this.contactos.push(contacto);
      }
    
    /*El concepto que utilizamos para añadir o eliminar contactos a la lista es como si fuesen canales
    de forma que el usuario se vincula o desvincula de un contacto ya creado, de esta forma, los contactos
    se crearan al darse de alta el usuario, para que cada usuario de de alta su contacto*/
    //Sirve para que otros contactos puedan añadir el mismo contacto
    join(contactKey) {
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