import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ModalOptions } from 'ionic-angular';
import { Reserva } from '../../models/reserva.model';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';


@IonicPage()
@Component({
  selector: 'page-tab4',
  templateUrl: 'tab4.html',
})
export class Tab4Page {
  reservaid:string;
  dia:string;
  mes:string;
  hora:string;
  Reserva:Reserva;
  reservas:Observable<Reserva[]>;
  constructor(public navCtrl: NavController,private afAuth: AngularFireAuth, private afDataBase: AngularFireDatabase, public navParams: NavParams,private crearReservaMod: ModalController) {
  }
  

  crearReserva(){
      const myModalOptions: ModalOptions = {
        enableBackdropDismiss: false
      }
      const myModal = this.crearReservaMod.create('CrearReservaPage', { }, myModalOptions);
      myModal.present();
  }
  ionViewWillEnter() {
    this.afAuth.authState.take(1).subscribe( async data=>{
      //De esta manera el id sera el mismo da igual quien cree la conversacion
      this.reservas=this.afDataBase.list<Reserva>(`reserva`,ref => ref.orderByChild("usuarioid").equalTo(data.uid)).valueChanges();    
      });
  
  }
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad Tab4Page');

  }

}
