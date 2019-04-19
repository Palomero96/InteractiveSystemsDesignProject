import { ContactService } from './../../services/contact.service';
import { ChatService } from './../../services/chat.service';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConversacionPage } from './conversacion';

@NgModule({
  declarations: [
    ConversacionPage,
  ],
  providers:[
    ChatService,

  ],
  imports: [
    IonicPageModule.forChild(ConversacionPage),
  ],
})
export class ConversacionPageModule {}
