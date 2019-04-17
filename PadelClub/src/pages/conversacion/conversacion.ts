import { Contact } from './../../../../../LabsDSI/microp_7/microp_7/src/models/contact.model';
import { MensajeService } from './../../services/mensaje.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { Mensaje } from '../../models/mensaje.model';

/**
 * Generated class for the ConversacionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-conversacion',
  templateUrl: 'conversacion.html',
})
export class ConversacionPage {
  Contact:Contact;
  mensajes$:Observable<Mensaje[]>;
  chatid:string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private MensajeService:MensajeService) {
  }
  ionViewWillEnter(){
    //Habra que darle un valor al chatID en funcion del que haya clickado
    this.mensajes$ = this.MensajeService
    .getMensajes(this.chatid) //Retorna la DB
    .snapshotChanges() //retorna los cambios en la DB (key and value)
    .map(
    changes => {return changes.map(c=> ({key: c.payload.key, ...c.payload.val()}));});
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConversacionPage');
  }

}
