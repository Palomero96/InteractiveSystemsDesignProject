import { AngularFireObject } from 'angularfire2/database';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController, ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, } from 'angularfire2/database';
import { Contact } from '../../models/contact.model';



@IonicPage()
@Component({
  selector: 'page-tab1',
  templateUrl: 'tab1.html',
})
export class Tab1Page {
 

  eventSource = [];
  viewTitle: string;
  selectedDay = new Date();
  calendar = {
    mode: 'month',
    currentDate: new Date()
  };

  datosPerfil: AngularFireObject<Contact>;

  constructor(private afAuth: AngularFireAuth, private afDataBase: AngularFireDatabase,
    private toast: ToastController,
    public navCtrl: NavController, private modalCtrl: ModalController, private alertCtrl: AlertController) {
  }

   ionViewDidLoad() {
     this.afAuth.authState.take(1).subscribe(data=>{
       if(data && data.email && data.uid)
       {
         this.toast.create({
           message: `Bienvenido, ${data.email}`,
           duration: 2000
         }).present();
         
         this.datosPerfil = this.afDataBase.object(`perfil/${data.uid}`);
       }
       else
       {
         this.toast.create({
           message: `No hay datos de usuario`,
           duration: 2000
         }).present();
       }
     })
    }
  onViewTitleChanged(title) {
    this.viewTitle = title;
  }
  onTimeSelected(ev) {
    this.selectedDay = ev.selectedTime;
  }
  
}
