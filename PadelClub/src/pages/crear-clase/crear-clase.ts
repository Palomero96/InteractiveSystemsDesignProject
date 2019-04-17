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
  data: {
    userId: string,
    userName: string
  };

  claseData: {
    fechaIni: string,
    fechaFin: string,
    diaSemana: string,
    hora: string,
    nivel: string,
    pista: string
  };

  constructor(private navParams: NavParams, private view: ViewController) {
     this.data = this.navParams.get('data');
     this.claseData = {
      fechaIni: "",
      fechaFin: "",
      diaSemana: "",
      hora: "",
      nivel: "",
      pista: ""
    };
  }

  ionViewWillLoad() {
    // this.data = this.navParams.get('data');
    console.log(this.data);
    // alert(data);
  }

  crearClaseSubmit() {
    console.log(this.data);
    alert("¡Nueva clase creada!");
    this.cerrarCrearClase();
  }

  cerrarCrearClase() {
    const data = {
      userId: 'profesor2',
      userName: 'nombre_profesor2'
    };
    this.view.dismiss(data);
  }

}
