import { ContactService } from './../../services/contact.service';
import { AddContactoPage } from './../add-contacto/add-contacto';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Toast, ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Contact } from '../../models/contact.model';
import { Observable } from 'rxjs/Observable';
import { ConversacionPage } from '../conversacion/conversacion';
import { ChatService } from '../../services/chat.service';
import { Chat } from '../../models/chat.model';

/**
 * Generated class for the Tab5Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-tab5',
  templateUrl: 'tab5.html',
})
export class Tab5Page {
  userid:string;
  chat:Chat;
  chats:Observable<Chat[]>=null;
  chatid:string;
  chatService:ChatService;
  datosPerfil: Observable<{}>;
  amigosPerfil: Observable<{}>;

  constructor(private toast:ToastController, private conService: ContactService,
    private afAuth: AngularFireAuth, private afDataBase: AngularFireDatabase,
    public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.afAuth.authState.take(1).subscribe(data=>{
      if(data && data.email && data.uid)
      {
        this.datosPerfil = this.afDataBase.object(`perfil/${data.uid}`).valueChanges();
        this.amigosPerfil = this.conService.getAmigos(data.uid);
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

  irConversacion(useridcontacto ){
    this.userid=useridcontacto;
    this.afAuth.authState.take(1).subscribe(async data=>{
      //de esta manera el id sera el mismo da igual quien cree la conversacion
      this.chatid = 'chat_'+(data.uid<this.userid ? data.uid+'_'+this.userid : this.userid+'_'+data.uid);
      //No se muy bien porque me da error esto
      //REVISAR
      console.log(this.chatid);
     /* this.chat = await this.chatService.getChatP(data.uid, this.userid); //retorna los cambios en la DB (key and value)
*/

      
        this.chat ={
        chatid: this.chatid,
        user1: data.uid,
        user2:this.userid,
        }
        this.afAuth.authState.take(1).subscribe(auth => {
          this.afDataBase.object(`chat/${auth.uid}/${this.chat.user2}`).set(value);
          this.afDataBase.object(`chat/${this.chat.user2}/${auth.uid}`).set(value);
        });
       
  this.navCtrl.push(ConversacionPage,{
              chatid:this.chatid,
              userdest:this.userid,
              });
    }
    )}
  nuevoAmigo()
  {
    this.navCtrl.push(AddContactoPage);
  }

}
