import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from "@angular/core";
import { AngularFireDatabase, AngularFireObject } from "angularfire2/database";
import { Observable } from 'rxjs/Observable';
import { Chat } from '../models/chat.model';

@Injectable()
export class ChatService {
    chat: Chat=null;
    chatAFO: AngularFireObject<Chat>;
    chats: Observable<Chat[]> = null;
    chatsUser1: Observable<Chat[]> = null;
    chatsUser2: Observable<Chat[]> = null;
    
    constructor(private afAuth: AngularFireAuth, private afDataBase: AngularFireDatabase,) {
    }
    addChat(value: Chat ) {
        this.afDataBase.list(`chat/`).push(this.chat); 
    }

    getUnChat(chatid:string) {

       
        console.log(this.afDataBase.object<Chat>(`chat/${chatid}`))
        return this.afDataBase.object(`chat/${chatid}`);
      }

}
