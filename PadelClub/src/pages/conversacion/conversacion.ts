import { Contact } from './../../models/contact.model';
import { MensajeService } from './../../services/mensaje.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { Mensaje } from '../../models/mensaje.model';
import { AngularFireAuth } from 'angularfire2/auth';

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
  Contact:Contact; //MIRar como obtener ese dato
  mensajes$:Observable<Mensaje[]>;
  chatid:string; //mirar como obtener ese dato
  userid:string;
  mensaje:Mensaje;
  enviar:string;
  constructor(public navCtrl: NavController, public navParams: NavParams, private MensajeService:MensajeService,private afAuth: AngularFireAuth) {
  }
  ionViewWillEnter(){
    //Habra que darle un valor al chatID en funcion del que haya clickado
    this.mensajes$ = this.MensajeService
    .getMensajes(this.chatid) //Retorna la DB
    .snapshotChanges() //retorna los cambios en la DB (key and value)
    .map(
    changes => {return changes.map(c=> ({key: c.payload.key, ...c.payload.val()}));});
    }

   enviarMensaje() {
    this.afAuth.authState.take(1).subscribe(data=>{

     this.mensaje ={
        id: this.chatid,
        origen: data.uid,//falta modificar esto para lo del id
        destinatario: this.Contact.id,
        contenido:this.enviar,
     }
     this.MensajeService.addMensaje(this.mensaje, this.chatid);
    })
   }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConversacionPage');
  }

}
