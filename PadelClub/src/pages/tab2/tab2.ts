import { ConversacionPage } from './../conversacion/conversacion';
import { ChatService } from './../../services/chat.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Chat } from '../../models/chat.model';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';

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
  chats1: Observable<{}>;
  chats2: Observable<{}>;
  
  chats: Observable<{}>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private ChatService:ChatService,private afAuth: AngularFireAuth) {
  }
  
  ionViewWillEnter(){
    
        this.afAuth.authState.take(1).subscribe(data=>{
         
        this.chats1 = this.ChatService.getChats1(data.uid);
        this.chats2 = this.ChatService.getChats2(data.uid);
   
    
   })
  }

  /* Cuando hagamos la funcion del click para el boton habra que
  crear una variable en el servicio para el tener la informacion del chat
  y que la tenga la pagina de conversacion */
  ionViewDidLoad() {
    console.log('ionViewDidLoad Tab2Page');
  }
  irConversacion(chat ){
    this.navCtrl.push(ConversacionPage,{
    chatid:chat.chatid
    });
    }
}
