import { ContactService } from './../../services/contact.service';
import { Contact } from './../../models/contact.model';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { TabsPage } from '../tabs/tabs';

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
  contacts$: Observable<Contact[]>;


  constructor(private afAuth: AngularFireAuth, private afDataBase: AngularFireDatabase,
    public navCtrl: NavController, public navParams: NavParams, private ContactService: ContactService) {
  }

  ionViewWillEnter(){
      this.contacts$ = this.ContactService
      .getContactos() //Retorna la DB
      }
   
  ionViewDidLoad() {
    console.log('ionViewDidLoad AddContactoPage');
  }

  addAmigo(value)
  {
    this.afAuth.authState.take(1).subscribe(auth => {
      this.afDataBase.object(`perfil/${auth.uid}/amigos/`).set({id:value}).then(() => this.navCtrl.pop());
    })
  }

  back()
  {
    this.navCtrl.pop();
  }
}
