import { ContactService } from './../../services/contact.service';
import { ClaseService } from './../../services/clase.service';
import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController, NavController } from 'ionic-angular';
import { Clase } from '../../models/clase.model';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Tab3Page } from '../tab3/tab3';

/**
 * Generated class for the CrearClasePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-crear-clase',
  templateUrl: 'crear-clase.html',
})
export class CrearClasePage {
  datosClase: Clase;
  datosPerfil: Observable<{}>;
  userId: string;
  userName: string;
  dia:string;
  hora:string;
  nivel:string;
  plazasmax:number;
  claseData: Clase;

  constructor(private afAuth: AngularFireAuth, private afDataBase: AngularFireDatabase,
    private claseService: ClaseService,
    private conService: ContactService,
    private navParams: NavParams, private view: ViewController,
    private navCtrl: NavController) {
     
  }

  ionViewWillLoad() {
    // this.data = this.navParams.get('data');
    this.afAuth.authState.take(1).subscribe(async data=>{
      this.userId=data.uid;
      this.datosPerfil = this.afDataBase.object(`perfil/${data.uid}`).valueChanges();
    })
    
    // alert(data);
  }

  crearClaseSubmit() {
    this.datosClase={ dia: this.dia,
      profesor:this.userId,
      plazasmax : this.plazasmax,
      hora:this.hora,
      nivel:this.nivel,
      claseid:this.userId+this.dia+this.hora
    }

    this.afAuth.authState.take(1).subscribe(auth => {
      this.afDataBase.object(`clase/${this.datosClase.claseid}`).set(this.datosClase);
    })
    this.view.dismiss();
  }

  volver(){
    this.navCtrl.setRoot(Tab3Page);
  }

}
