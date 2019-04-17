import { ContactService } from './../../services/contact.service';
import { Contact } from './../../models/contact.model';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';

/**
 * Generated class for the AddContactoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-contacto',
  templateUrl: 'add-contacto.html',
})
export class AddContactoPage {

  contactos: Contact[] = [];
  contacts$: Observable<Contact[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private ContactService: ContactService) {
  }

  ionViewWillEnter(){
      this.contacts$ = this.ContactService
      .getContactos() //Retorna la DB
      .snapshotChanges() //retorna los cambios en la DB (key and value)
      .map(
      /*
      Estas líneas retornan un array de objetos con el id del registro y su
      contenido
      {
      "key":"value",
      contact.name,
      contact.organization,
      ...
      }
      */
      changes => {return changes.map(c=> ({key: c.payload.key, ...c.payload.val()}));});
      }
   
  ionViewDidLoad() {
    console.log('ionViewDidLoad AddContactoPage');
  }

  back()
  {
    this.navCtrl.pop();
  }
}
