import { ContactService } from './../../services/contact.service';
import { Contact } from './../../models/contact.model';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';


@IonicPage()
@Component({
  selector: 'page-add-contacto',
  templateUrl: 'add-contacto.html',
})
export class AddContactoPage {
  contacts$: Observable<Contact[]>;


  constructor(private afAuth: AngularFireAuth,private toast: ToastController, private afDataBase: AngularFireDatabase,
    public navCtrl: NavController, public navParams: NavParams, private ContactService: ContactService) {
  }

  ionViewWillEnter(){
      this.contacts$ = this.ContactService
      .getContactos() //Retorna la DB
      }
   
  ionViewDidLoad() {
    console.log('ionViewDidLoad AddContactoPage');
  }

  addAmigo(value:string)
  {
    this.afAuth.authState.take(1).subscribe(auth => {
      if(auth.uid==value){
        this.toast.create({
          message: `No se puede agregar a uno mismo`,
          duration: 2000
        }).present();
        return;
      }else{
      this.afDataBase.object(`perfil/${auth.uid}/amigos/${value}`).set({id:value});
      this.afDataBase.object(`perfil/${value}/amigos/${auth.uid}`).set({id:auth.uid}).then(() => this.navCtrl.pop());
      }
    })
  
  }

  volver()
  {
    this.navCtrl.pop();
  }
}
