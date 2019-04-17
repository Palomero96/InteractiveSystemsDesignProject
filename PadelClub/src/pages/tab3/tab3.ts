import { Component } from '@angular/core';
import { Modal, ModalOptions, IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, private crearClaseMod: ModalController, public navParams: NavParams) {
    this.esProfesor = true;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Tab3Page');
  }

  crearClase() {
    if (this.esProfesor) {
      const myModalOptions: ModalOptions = {
        enableBackdropDismiss: false
      }

      const myUserData = {
        userId: 'profesor1',
        userName: 'nombre_profesor1',
      }

      const myModal = this.crearClaseMod.create('CrearClasePage', { data: myUserData }, myModalOptions);
      
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
