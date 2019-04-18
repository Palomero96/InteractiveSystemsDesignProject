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
        this.chats = this.db.list<Chat>('chat/${value.user1}/${value.user2}');
        this.chats = this.db.list<Chat>('chat/${value.user2}/${value.user1}');
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
    getUserChats(Usuario): AngularFireList<Chat> {
            return this.chatsUser1 = this.db.list('chat', ref => ref.orderByChild('user1').equalTo(Usuario));
            
        }
    getChat(value)  {
        return (this.db.list('chat', ref => ref.orderByChild('chatid').equalTo(value)));
        
    }  
    getChatP(user1, user2)  {
        return this.db.list<Chat>('chat/${user1}/${user2}');

    }
    
}
