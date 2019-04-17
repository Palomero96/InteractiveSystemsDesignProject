import { AddContactoPage } from './../add-contacto/add-contacto';
import { Tab1Page } from './../tab1/tab1';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';

/**
 * Generated class for the Tab5Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tab5',
  templateUrl: 'tab5.html',
})
export class Tab5Page {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad Tab5Page');
  }

  openFilters()
  {
    this.navCtrl.push(LoginPage);
    //this.navCtrl.push(AddContactoPage);
  }

}
