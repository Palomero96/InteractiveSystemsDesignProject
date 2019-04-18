import { AddPerfilPage } from './../pages/add-perfil/add-perfil';
import { AngularFireAuth, AngularFireAuthModule } from 'angularfire2/auth';
import { AddContactoPage } from './../pages/add-contacto/add-contacto';
import { ChatService } from './../services/chat.service';
import { Tab5Page } from './../pages/tab5/tab5';
import { Tab4Page } from './../pages/tab4/tab4';
import { Tab3Page } from './../pages/tab3/tab3';
import { Tab2Page } from './../pages/tab2/tab2';
import { Tab1Page } from './../pages/tab1/tab1';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { TabsPage } from '../pages/tabs/tabs';
import { CalendarModule } from 'ionic3-calendar-en';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { FIREBASE_CONFIG } from './firebase.credentials';
import { ContactService } from '../services/contact.service';
import { ClaseService } from '../services/clase.service';
import { MensajeService } from '../services/mensaje.service';
import { ReservaService } from '../services/reserva.service';
import { LoginPage } from '../pages/login/login';
import { ConversacionPage } from '../pages/conversacion/conversacion';

// import { NgCalendarModule } from 'ionic2-calendar';


@NgModule({
  declarations: [
    MyApp,
    AddContactoPage,
    LoginPage,
    AddPerfilPage,
    ConversacionPage,
    Tab1Page,
    Tab2Page,
    Tab3Page,
    Tab4Page,
    Tab5Page,
    TabsPage
  ],
  imports: [
    BrowserModule,CalendarModule, AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireDatabaseModule,
    IonicModule.forRoot(MyApp),
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AddContactoPage,
    LoginPage,
    AddPerfilPage,
    ConversacionPage,
    Tab1Page,
    Tab2Page,
    Tab3Page,
    Tab4Page,
    Tab5Page,
    TabsPage
  ],
  providers: [
    StatusBar,
    ContactService,
    ClaseService,
    MensajeService,
    ReservaService,
    ChatService,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
