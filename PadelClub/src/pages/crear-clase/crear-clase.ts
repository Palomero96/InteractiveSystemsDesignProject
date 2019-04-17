import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';

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

  constructor(private navParams: NavParams, private view: ViewController) {
  }

  ionViewWillLoad() {
    const data = this.navParams.get('data');
    console.log(data);
    // alert(data);
  }

  cerrarCrearClase() {
    const data = {
      userId: 'profesor2',
      userName: 'nombre_profesor2'
    };
    this.view.dismiss(data);
  }

}
