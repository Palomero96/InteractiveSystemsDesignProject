import { AddContactoPage } from './../add-contacto/add-contacto';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Tab5Page } from './tab5';
import { LoginPage } from '../login/login';

@NgModule({
  declarations: [
    Tab5Page,
    LoginPage,
    AddContactoPage,
  ],
  entryComponents: [AddContactoPage,LoginPage],
  imports: [
    IonicPageModule.forChild(Tab5Page),
  ],
})
export class Tab5PageModule {}
