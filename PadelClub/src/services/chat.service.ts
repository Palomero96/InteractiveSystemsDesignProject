import { Chat } from '../models/chat.model';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject} from 'angularfire2/database';

@Injectable()
export class ChatService {
    chats: AngularFireList<Chat> = null;
    constructor(private db: AngularFireDatabase) {
    }
    addChat(value: Chat ) {
        this.chats = this.db.list<Chat>('chat');
        return this.chats.push(value);
    }
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
