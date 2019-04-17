import { AngularFireAuth, AngularFireAuthModule } from 'angularfire2/auth';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginPage } from './login';

@NgModule({
  declarations: [
    LoginPage,
  ],
  imports: [
    IonicPageModule.forChild(LoginPage),
    AngularFireAuthModule,
  ],
  providers:[
    AngularFireAuthModule,
  ],
})
export class LoginPageModule {}
