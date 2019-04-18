import { AddPerfilPageModule } from './../add-perfil/add-perfil.module';
import { AddPerfilPage } from './../add-perfil/add-perfil';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginPage } from './login';

@NgModule({
  declarations: [
    LoginPage,
    AddPerfilPage,
  ],
  imports: [
    IonicPageModule.forChild(LoginPage),
    AddPerfilPageModule,
    AngularFireAuthModule,
  ],
  providers:[
    AngularFireAuthModule,
  ],
  entryComponents: [
    LoginPage,
    AddPerfilPage,
  ],
})
export class LoginPageModule {}
