import { Component } from '@angular/core';
import { Modal, ModalOptions, IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { dateSortValue } from 'ionic-angular/umd/util/datetime-util';
import { AddPerfilPage } from '../add-perfil/add-perfil';
import { Contact } from '../../models/contact.model';

/**
 * Generated class for the Tab3Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tab3',
  templateUrl: 'tab3.html',
})
export class Tab3Page {

  esProfesor: boolean;
  myUserData: {};
  datosPerfil: AngularFireObject<Contact>;;
  Perfil:Contact;

  constructor(public navCtrl: NavController,private afAuth: AngularFireAuth, private afDataBase: AngularFireDatabase, private crearClaseMod: ModalController, public navParams: NavParams) {
    this.esProfesor = false;   
  }

  ionViewDidLoad() {

    this.afAuth.authState.take(1).subscribe(async data=>{
      //De esta manera el id sera el mismo da igual quien cree la conversacion
            
        this.datosPerfil = this.afDataBase.object(`perfil/${data.uid}`);
        this.datosPerfil.snapshotChanges().subscribe(async action => {
        this.Perfil = await action.payload.val();
        //asignamos la variable esProfesor para mostrar una cosa u otra en el html
        if(this.Perfil.rol=="Profesor"){
          this.esProfesor=true;
        }  

      });
      });
  }

  crearClase() {
    if (this.esProfesor) {
      const myModalOptions: ModalOptions = {
        enableBackdropDismiss: false
      }

      this.myUserData = {
        userId: 'profesor1',
        userName: 'nombre_profesor1',
      }

      const myModal = this.crearClaseMod.create('CrearClasePage', { data: this.myUserData }, myModalOptions);
      
      myModal.present();

      myModal.onDidDismiss((data) => {
        console.log("I have just dismissed");
        console.log(data);
      })

      myModal.onWillDismiss((data) => {
        console.log("I'm about to dismiss");
        console.log(data);
      })

    }

  }

}
