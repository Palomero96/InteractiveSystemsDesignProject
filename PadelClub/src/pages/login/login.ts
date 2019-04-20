import { TabsPage } from './../tabs/tabs';
import { AddPerfilPage } from './../add-perfil/add-perfil';
import { Tab1Page } from './../tab1/tab1';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  email:string;
  pass:string;
  constructor(private afAuth: AngularFireAuth,  
    public navCtrl: NavController, public navParams: NavParams) {
  }
  async registro()
  {
    try{
    const result = await this.afAuth.auth.createUserWithEmailAndPassword(this.email, this.pass).then(()=>this.navCtrl.setRoot(AddPerfilPage,{paramEmail: this.email}));
  }
    catch(e)
    {
      alert(e);
    }
  }
  entrarUsuario()
  {
    try{
      //Para evitar el login en el testeo
      /*Login alumno*///const result = this.afAuth.auth.signInWithEmailAndPassword("user1@test.com", "passuser1").then(()=> this.navCtrl.setRoot(TabsPage));
      /*Login profesor*/const result = this.afAuth.auth.signInWithEmailAndPassword("profe1@test.com", "passprofe1").then(()=> this.navCtrl.setRoot(TabsPage));
      
      //Esta es la llamada correcta
      //const result = this.afAuth.auth.signInWithEmailAndPassword(this.email, this.pass).then(()=> this.navCtrl.setRoot(TabsPage));
    }
    catch(e)
    {
      alert(e);
    }
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    //Esto es para evitar el login en el testeo
    this.entrarUsuario();
  }

}
