import { Contact } from './../../models/contact.model';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import 'rxjs/add/operator/take';
import { Observable } from 'rxjs/Observable';
import { TabsPage } from '../tabs/tabs';



@IonicPage()
@Component({
  selector: 'page-add-perfil',
  templateUrl: 'add-perfil.html',
})
export class AddPerfilPage {

  nombre:string;
  apellidos:string;
  edad:number;
  email:string;
  contacto: Contact;

  constructor(private afAuth: AngularFireAuth, private afDataBase: AngularFireDatabase,
    public navCtrl: NavController, public navParams: NavParams) {
      this.email = navParams.get("paramEmail");
  }

  //metodo para completar el perfil en firebase
  completarPerfil()
  {
    
    //Para poder utilizar el take(1) hay que importarlo arriba de rxjs
    this.afAuth.authState.take(1).subscribe(auth => {
      this.contacto = { 
        id: auth.uid,
        nombre: this.nombre,
        apellidos: this.apellidos,
        edad: this.edad,
        nivel: "Provisional",
        rol: "Alumno",
        email: this.email,
      }
      this.afDataBase.object(`perfil/${auth.uid}`).set(this.contacto).then(() => this.navCtrl.push(TabsPage));
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddPerfilPage');
  }

}
