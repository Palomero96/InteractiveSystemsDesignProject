import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ViewController } from 'ionic-angular';
import { Reserva } from '../../models/reserva.model';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Tab4Page } from '../tab4/tab4';

/**
 * Generated class for the CrearReservaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-crear-reserva',
  templateUrl: 'crear-reserva.html',
})
export class CrearReservaPage {
  reservaid:string;
  
  dia:number;
  mes:number;
  hora:string;
  Reserva:Reserva;
  reservaAux: Reserva;
  reservaAuxAFO: AngularFireObject<Reserva>;
  constructor(private afAuth: AngularFireAuth,private view: ViewController, private afDataBase: AngularFireDatabase, public navCtrl: NavController,private toast: ToastController, public navParams: NavParams) {
  }
  reservar(){
    if(this.mes>=1 || this.mes<=12){
      var d= new Date (`2019-`+this.mes+`-`+this.dia);
      if (Object.prototype.toString.call(d) === "[object Date]") {
        if (isNaN(d.getTime())) { 
          this.toast.create({
            message: `Fecha incorrecta. Intentelo de nuevo`,
            duration: 2000
          }).present();
          return;
        } else {
          var c = this.dia+` `+this.mes+` `+`2019`;
              var temp = new Array();
              temp = c.split(' ');
              var x = new Date ( temp[1]+" "+temp[0]+", "+temp[2] );
            if (x.getTime() > (new Date().getTime())) {
          /* Habria que comprobar que no sea en horario de clases*/
          var diasemana = d.getDay();
          /* Si es en dias de diario */
          if (diasemana == 1 || diasemana == 2 ||diasemana == 3 || diasemana == 4 || diasemana == 5){
              if(this.hora == "16:00" || this.hora == "17:00" ||this.hora == "18:00" || this.hora == "19:00" || this.hora == "20:00"){
                this.toast.create({
                  message: `Este horario esta reservado para clases`,
                  duration: 2000
                }).present();
                return;
              }else{
                /* Comprobar que no haya ninguna reserva y añadir la reserva para esa hora*/
                this.afAuth.authState.take(1).subscribe(auth => {
                  this.Reserva= {
                  reservaid:this.hora+`-`+this.dia+`-`+this.mes,
                  usuarioid:auth.uid,
                  dia:this.dia.toString(),
                  hora:this.hora,
                  mes:this.mes.toString(),
                }
                this.reservaAuxAFO = this.afDataBase.object<Reserva>(`reserva/${this.Reserva.reservaid}`);
                this.reservaAuxAFO.snapshotChanges().take(1).subscribe(async action => {
                this.reservaAux = await action.payload.val();
                  if(this.reservaAux==null){
                    this.afDataBase.object(`reserva/${this.Reserva.reservaid}`).set(this.Reserva);
                    this.view.dismiss();
                  }else{
                    this.toast.create({
                      message: `Este horario esta ya reservado`,
                      duration: 2000
                    }).present();
                    return;
                  }
                });
                });
              } 
          }else{
              /* Comprobar que no haya ninguna reserva y añadir la reserva para esa hora*/
              this.afAuth.authState.take(1).subscribe(auth => {
                this.Reserva= {
                reservaid:this.hora+`-`+this.dia+`-`+this.mes,
                usuarioid:auth.uid,
                dia:this.dia.toString(),
                hora:this.hora,
                mes:this.mes.toString(),
              }
              this.reservaAuxAFO = this.afDataBase.object<Reserva>(`reserva/${this.Reserva.reservaid}`);
              this.reservaAuxAFO.snapshotChanges().take(1).subscribe(async action => {
              this.reservaAux = await action.payload.val();
              if(this.reservaAux==null){
                  this.afDataBase.object(`reserva/${this.Reserva.reservaid}`).set(this.Reserva);
                  this.view.dismiss();
                }else{
                  this.toast.create({
                    message: `Este horario esta ya reservado`,
                    duration: 2000
                  }).present();
                  return;
                }
              });
              });
          }
        }else{
          this.toast.create({
            message: `La fecha que ha elegido ya ha pasado`,
            duration: 2000
          }).present();
          return;
        }
      }
      } else {
        this.toast.create({
            message: `Fecha no valida. Intentelo de nuevo`,
            duration: 2000
          }).present();
          return;
      }
    }
    
  }
  volver(){
    this.navCtrl.setRoot(Tab4Page);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad CrearReservaPage');
  }

}
