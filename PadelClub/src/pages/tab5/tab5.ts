import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireObject} from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';




@Component({
  selector: 'page-tab5',
  templateUrl: 'tab5.html',
})
export class Tab5Page {
  
  datosPerfil: Observable<{}>;
 
  constructor(private toast:ToastController,
    private afAuth: AngularFireAuth, private afDataBase: AngularFireDatabase,
    public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.afAuth.authState.take(1).subscribe(data=>{
      if(data && data.email && data.uid)
      {
        this.datosPerfil = this.afDataBase.object(`perfil/${data.uid}`).valueChanges();
      }
      else
      {
        this.toast.create({
          message: `No hay datos de usuario`,
          duration: 2000
        }).present();
      }
    })
    console.log('ionViewDidLoad Tab5Page');
  }
}
