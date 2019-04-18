import { ChatService } from './../../services/chat.service';
import { Chat } from './../../models/chat.model';
import { AddContactoPage } from './../add-contacto/add-contacto';
import { Tab1Page } from './../tab1/tab1';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Toast, ToastController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Contact } from '../../models/contact.model';
import { Observable } from 'rxjs/Observable';
import { ConversacionPage } from '../conversacion/conversacion';

/**
 * Generated class for the Tab5Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tab5',
  templateUrl: 'tab5.html',
})
export class Tab5Page {
  userid:string;
  chat:Chat;
  chats:Observable<Chat[]>;
  chatid:string;
  ChatService:ChatService;
  datosPerfil: Observable<{}>;
  constructor(private toast:ToastController,
    private afAuth: AngularFireAuth, private afDataBase: AngularFireDatabase,
    public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.afAuth.authState.take(1).subscribe(data=>{
      if(data && data.email && data.uid)
      {
        this.datosPerfil = this.afDataBase.object(`perfil/${data.uid}`).valueChanges();
      }
      else
      {
        this.toast.create({
          message: `No hay datos de usuario`,
          duration: 2000
        }).present();
      }
    })
    console.log('ionViewDidLoad Tab5Page');
  }

  openFilters()
  {
    //this.navCtrl.push(AddContactoPage);
  }
  //Metodo para acceder a una conversacion, en caso de no existir la crea y la añade a la base de datos
  irConversacion(event ,useridcontacto ){
    this.userid=useridcontacto;
    this.afAuth.authState.take(1).subscribe(data=>{
      //de esta manera el id sera el mismo da igual quien cree la conversacion
      this.chatid = 'chat_'+(data.uid<this.userid ? data.uid+'_'+this.userid : this.userid+'_'+data.uid);
      //No se muy bien porque me da error esto
      //REVISAR
      this.chats=this.ChatService.getChat(this.chatid).snapshotChanges() //retorna los cambios en la DB (key and value)
      .map(
      changes => {return changes.map(c=> ({key: c.payload.key, ...c.payload.val()}));});

      if (null==this.chats){
        this.chat ={
        chatid: this.chatid,
        user1: data.uid,
        user2:this.userid 
        }
        this.ChatService.addChat(this.chat);
       }
   this.navCtrl.push(ConversacionPage,{
              item:this.chatid
              });
    }
    )}

}
