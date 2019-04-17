import { Chat } from '../models/chat.model';
import { Injectable } from '@angular/core';


import { combineLatest } from 'rxjs/observable/combineLatest';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';

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
    // HABRA que modificar los parametros que recibe el metodo
    // Metodo para recuperar los chats en los que el usuario sea el primero 
    getUserChats1(Usuario): AngularFireList<Chat> {
            return this.chatsUser1 = this.db.list('chat', ref => ref.orderByChild('user1').equalTo(Usuario));
             
        }
    // Metodo para recuperar los chats en los que el usuario sea el primero    
    getUserChats2(Usuario): AngularFireList<Chat> {
            return this.chatsUser2 = this.db.list('chat', ref => ref.orderByChild('user2').equalTo(Usuario));
             
        }    

    // Metodo para recuperar las Clase de un Usuario
  

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
