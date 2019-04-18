import { TabsPage } from './../tabs/tabs';

import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddPerfilPage } from './add-perfil';
import { Tab1Page } from '../tab1/tab1';

@NgModule({
  declarations: [
    AddPerfilPage,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    Tab1Page,
    TabsPage,
  ],
  imports: [
    IonicPageModule.forChild(AddPerfilPage),
  ],
  providers:[
    AngularFireAuthModule,
    AngularFireDatabaseModule,
  ],
  entryComponents: [
    Tab1Page,
    TabsPage,
    AddPerfilPage,
  ],
})
export class AddPerfilPageModule {}
