import { ChatService } from './../../services/chat.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Chat } from '../../models/chat.model';
import { Observable } from 'rxjs/Observable';

/**
 * Generated class for the Tab2Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tab2',
  templateUrl: 'tab2.html',
})
export class Tab2Page {
  chat1$: Observable<Chat[]>;
  chat2$: Observable<Chat[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private ChatService:ChatService) {
  }
  /*
  ionViewWillEnter(){
    this.chat1$ = this.ChatService
    .getUserChats1(Usuario) //Retorna la DB
    .snapshotChanges() //retorna los cambios en la DB (key and value)
    .map(
    changes => {return changes.map(c=> ({key: c.payload.key, ...c.payload.val()}));});
    
    this.chat2$ = this.ChatService
    .getUserChats2(Usuario) //Retorna la DB
    .snapshotChanges() //retorna los cambios en la DB (key and value)
    .map(
    changes => {return changes.map(c=> ({key: c.payload.key, ...c.payload.val()}));});
    
  }*/

  /* Cuando hagamos la funcion del click para el boton habra que
  crear una variable en el servicio para el tener la informacion del chat
  y que la tenga la pagina de conversacion */
  ionViewDidLoad() {
    console.log('ionViewDidLoad Tab2Page');
  }

}
