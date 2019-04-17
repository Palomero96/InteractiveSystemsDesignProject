import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CrearClasePage } from './crear-clase';

@NgModule({
  declarations: [
    CrearClasePage,
  ],
  imports: [
    IonicPageModule.forChild(CrearClasePage),
  ],
})
export class CrearClasePageModule {}
