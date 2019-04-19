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
import { Tab5Page } from '../tab5/tab5';

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
          }else{
            this.userdest=this.Chat.user1;
          }
          //Obtenemos el nombre del usuario origen
          this.contactoAuxiliar = this.afDataBase.object<Contact>(`perfil/${data.uid}`);
          this.contactoAuxiliar.snapshotChanges().subscribe(async action => {
          this.contactoUno = await action.payload.val();
          console.log("Nombre "+ this.contactoUno.nombre)
          this.userorigen=this.contactoUno.nombre;
        });
        //Obtenemos el nombre del usuario al que queremos enviar mensajes
        this.contactoAuxiliar = this.afDataBase.object<Contact>(`perfil/${this.userdest}`);
        this.contactoAuxiliar.snapshotChanges().subscribe(async action => {
        this.contactoDos = await action.payload.val();
        console.log("Nombre "+ this.contactoDos.nombre)
        this.userdest=this.contactoDos.nombre + "  " + this.contactoDos.apellidos;
      });
        
        
        
        });
        
  
      })
      this.mensajes$ = this.MensajeService.getMensajes(this.chatid).valueChanges();
      }
  
      enviarMensaje() {
  
      this.afAuth.authState.take(1).subscribe(data=>{
        this.mensaje ={
          id: this.chatid,
          origen: this.contactoUno.nombre,
          destinatario: this.contactoDos.nombre,
          contenido:this.enviar,
        }
        this.enviar="";
        this.MensajeService.addMensaje(this.mensaje, this.chatid);
      })
    
  }

  ionViewWillLeave(){
   this.navCtrl.setRoot(Tab5Page);
  }
}
