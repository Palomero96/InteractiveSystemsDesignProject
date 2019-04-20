import { ContactService } from './../../services/contact.service';
import { ChatService } from './../../services/chat.service';
import { Contact } from './../../models/contact.model';
import { MensajeService } from './../../services/mensaje.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { Mensaje } from '../../models/mensaje.model';
import { AngularFireAuth } from 'angularfire2/auth';
import { Chat } from '../../models/chat.model';
import { AngularFireObject, AngularFireDatabase } from 'angularfire2/database';
import { Tab2Page } from '../tab2/tab2';


@IonicPage()
@Component({
  selector: 'page-conversacion',
  templateUrl: 'conversacion.html',
})
export class ConversacionPage {
  servicioContacto: ContactService;
  contactoUno: Contact;
  contactoAuxiliar: AngularFireObject<Contact>;
  contactoDos: Contact;
  Contact:Contact; //MIRar como obtener ese dato
  mensajes$:Observable<Mensaje[]>;
  chatid:string; //mirar como obtener ese dato
  Chat:Chat;
  chatAFO: AngularFireObject<Chat>;
  contactoAFO: AngularFireObject<Contact>;
  chats:Observable<Chat[]>;
  servicioChat: ChatService;
  userorigen:string;
  userdest:string;
  mensaje:Mensaje;
  enviar:string;
  nombre1:string;
  nombre2:string;
  constructor(private afDataBase: AngularFireDatabase, private ChatService: ChatService,
    public navCtrl: NavController, public navParams: NavParams, private MensajeService:MensajeService,private ContactService:ContactService,private afAuth: AngularFireAuth) {
  this.chatid = navParams.get("chatid");
  this.userdest = navParams.get("userdest");
  
  }
   async ionViewWillEnter(){
     //Obtenemos el chat correspondiente
    this.chatAFO = this.afDataBase.object<Chat>(`chat/${this.chatid}`);
    this.chatAFO.snapshotChanges().subscribe(async action => {
        this.Chat = await action.payload.val();
        this.afAuth.authState.subscribe(async data=>{
        

         if(this.Chat.user1 == data.uid){
            this.userdest=this.Chat.user2;
            this.nombre2=this.Chat.nombre2;
            this.nombre1=this.Chat.nombre1;
          }else{
            this.userdest=this.Chat.user1;
            this.nombre1=this.Chat.nombre2;
            this.nombre2=this.Chat.nombre1;
          }        
        });
        
  
      })
      this.mensajes$ = this.MensajeService.getMensajes(this.chatid).valueChanges();
      }
  
      enviarMensaje() {
  
      this.afAuth.authState.take(1).subscribe(data=>{
        this.mensaje ={
          id: this.chatid,
          origen: this.nombre1,
          destinatario: this.nombre2,
          contenido:this.enviar,
        }
        this.enviar="";
        this.MensajeService.addMensaje(this.mensaje, this.chatid);
      })
    
  }
  ionViewWillLeave(){
    this.navCtrl.setRoot(Tab2Page);
   }
}
