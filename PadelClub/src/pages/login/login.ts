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
registro()
  {
    alert("usuario " + this.email+"    pass "+ this.pass);
    const result = this.afAuth.auth.createUserWithEmailAndPassword(this.email, this.pass);
    alert(result);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
