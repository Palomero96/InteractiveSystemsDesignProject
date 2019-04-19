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
  userdest:string;
  mensaje:Mensaje;
  enviar:string;
  constructor(private afDataBase: AngularFireDatabase,
    public navCtrl: NavController, public navParams: NavParams, private MensajeService:MensajeService,private ContactService:ContactService,private afAuth: AngularFireAuth) {
  this.chatid = navParams.get("chatid");
  this.userdest = navParams.get("userdest");
  
  }
  ionViewWillEnter(){
    this.chatAFO = this.afDataBase.object<Chat>(`chat/${this.chatid}`);
    this.chatAFO.snapshotChanges().subscribe(async action => {
        console.log(action.type);
        console.log(action.key)
        console.log(action.payload.val())
        this.Chat = await action.payload.val();

        this.afAuth.authState.subscribe(async data=>{
          console.log("USER1  "+this.Chat.user1);
          console.log("DATAuid  "+ data.uid);
          if(this.Chat.user1 == data.uid){
            this.userdest=this.Chat.user2;
          }else{
            this.userdest=this.Chat.user1;
          }
         /*this.ContactService.getContacto(data.uid).then((valueOrigen: Contact) =>
          {
            this.contactoUno = valueOrigen;
            
          })*/
           /*
          this.servicioContacto.getContacto(this.userdest).then((valueDestino: Contact) =>
          {
            this.contactoDestino = valueDestino;
          })*/

         /* this.contactoAuxiliar = this.afDataBase.object<Contact>(`perfil/${data.uid}`);
          this.contactoAuxiliar.snapshotChanges().subscribe(async action => {
          this.contactoUno = await action.payload.val();
          console.log("Nombre "+ this.contactoUno.nombre)
        });*/
          
        this.contactoUno = await this.ContactService.getContacto(data.uid);
        this.contactoDos = await this.ContactService.getContacto(this.userdest);
        console.log("Recibo esto " + await this.ContactService.getContacto(data.uid))
        });
        
  
      })

    console.log("Nombre "+ this.contactoUno.nombre)
        console.log("Nombre2 "+ this.contactoDos.nombre)
      //Habra que darle un valor al chatID en funcion del que haya clickado
      this.mensajes$ = this.MensajeService
      .getMensajes(this.chatid).valueChanges(); //Retorna la DB;
      }
  
      enviarMensaje() {
  
      this.afAuth.authState.take(1).subscribe(data=>{
        this.mensaje ={
          id: this.chatid,
          origen: data.uid,//falta modificar esto para lo del id
          //nombre_origen: this.contactoOrigen.nombre,
          destinatario: this.userdest,
         // nombre_destinatario: this.contactoDestino.nombre,
          contenido:this.enviar,
        }
        this.MensajeService.addMensaje(this.mensaje, this.chatid);
      })
    //this.chat=this.servicioChat.getUnChat(this.chatid);
  }
  
  /*ionViewWillEnter(){
    //REVISAR
    console.log("Aquí llego "+ this.chatid)
    try {
      this.Chat=this.servicioChat.getChat(this.chatid);
    } catch (error) {
      console.log(error)
    }
    
    
    this.afAuth.authState.subscribe(data=>{
    if(this.Chat.user1==data.uid){
      this.userdest=this.Chat.user2;
    }else{
      this.userdest=this.Chat.user1;
    }
    

    })
    //Habra que darle un valor al chatID en funcion del que haya clickado
    this.mensajes$ = this.MensajeService
    .getMensajes(this.chatid).valueChanges(); //Retorna la DB;
    }

   enviarMensaje() {

    this.afAuth.authState.take(1).subscribe(data=>{

     this.mensaje ={
        id: this.chatid,
        origen: data.uid,//falta modificar esto para lo del id
        destinatario: this.userdest,
        contenido:this.enviar,
     }
     this.MensajeService.addMensaje(this.mensaje, this.chatid);
    })
   }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConversacionPage');
  }*/
}
