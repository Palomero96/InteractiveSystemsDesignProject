import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CrearReservaPage } from './crear-reserva';

@NgModule({
  declarations: [
    CrearReservaPage,
  ],
  imports: [
    IonicPageModule.forChild(CrearReservaPage),
  ],
})
export class CrearReservaPageModule {}
