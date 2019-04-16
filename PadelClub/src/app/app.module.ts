import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {FIREBASE_CONFIG} from '../app/firebase.credentials';
import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database';

// Importamos los servicios
import {ContactService} from '../services/contact.service';
import {ClaseService} from '../services/clase.service';
import {MensajeService} from '../services/mensaje.service';
import {ReservaService} from '../services/reserva.service';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireDatabaseModule],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    ContactService,
    ClaseService,
    MensajeService,
    ReservaService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
