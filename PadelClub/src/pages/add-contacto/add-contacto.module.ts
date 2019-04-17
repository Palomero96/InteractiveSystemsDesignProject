import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddContactoPage } from './add-contacto';

@NgModule({
  declarations: [
    AddContactoPage,
  ],
  imports: [
    IonicPageModule.forChild(AddContactoPage),
  ],
})
export class AddContactoPageModule {}
