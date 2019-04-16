import { Chat } from '../models/chat.model';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject} from 'angularfire2/database';

import { combineLatest } from 'rxjs/observable/combineLatest';

@Injectable()
export class ChatService {
    chats: AngularFireList<Chat> = null;
    chatsUser1: AngularFireList<Chat> = null;
    chatsUser2: AngularFireList<Chat> = null;
    constructor(private db: AngularFireDatabase) {
    }
    addChat(value: Chat ) {
        this.chats = this.db.list<Chat>('chat');
        return this.chats.push(value);
    }
    // Metodo para recuperar las Clase de un Usuario
    // No estoy seguro de que funcione, deberia de recuperar los datos de las Clase de un usuario
    // getUserChats(Usuario): AngularFireList<Chat> {
    //     this.chatsUser1 = this.db.list('chat', ref => ref.orderByChild('user1').equalTo(Usuario));
    //     this.chatsUser2 = this.db.list('chat', ref => ref.orderByChild('user2').equalTo(Usuario));
    //     for let chatInstance in this.chatsUser2 {
    //         this.chats = this.chatsUser1.
    //         return this.chats;
    //     }
    // }

    // CON ESTO VALDRIA A NO SER QUE QUERAMOS QUE SE BORRE
    /* Cuando vayamos a llamar al metodo y darle valores a el objeto chat
    usaremos algo parecido a lo siguiente
    var user1 = "Frank";
    var user2 = "Eusthace";

var roomName = 'chat_'+(user1<user2 ? user1+'_'+user2 : user2+'_'+user1);

console.log(user1+', '+user2+' => '+ roomName);
user1 = "Eusthace";
user2 = "Frank";

var roomName = 'chat_'+(user1<user2 ? user1+'_'+user2 : user2+'_'+user1);

console.log(user1+', '+user2+' => '+ roomName); */
}
