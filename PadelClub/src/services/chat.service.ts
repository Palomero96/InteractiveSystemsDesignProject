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

    async getUnChat(chatid:string) {

        /*this.chatAFO = this.afDataBase.object<Chat>(`chat/${chatid}`);
        this.chatAFO.snapshotChanges().subscribe(action => {
        console.log(action.type);
        console.log(action.key)
        console.log(action.payload.val())
        this.chat = action.payload.val();
        });*/
        console.log(this.afDataBase.object<Chat>(`chat/${chatid}`))
        return await this.afDataBase.object(`chat/${chatid}`);
      }

    // HABRA que modificar los parametros que recibe el metodo
    // Metodo para recuperar los chats en los que el usuario sea el primero 
   /* getUserChats1(Usuario): Observable<Chat[]> {
            return this.chatsUser1 = this.afDataBase.list<Chat>('chat', ref => ref.orderByChild('user1').equalTo(Usuario)).valueChanges();
            
        }
    // Metodo para recuperar los chats en los que el usuario sea el primero    
    getUserChats2(Usuario): Observable<Chat[]> {
            return this.chatsUser2 = this.afDataBase.list<Chat>('chat', ref => ref.orderByChild('user2').equalTo(Usuario)).valueChanges();
             
    }  */
    /*getUserChats(Usuario): Observable<Chat[]> {
            return this.chatsUser1 = this.afDataBase.list<Chat>('chat', ref => ref.orderByChild('user1').equalTo(Usuario)).valueChanges();
            
        }
    getChat(value: string)  {
        console.log("Entro en getChat")
        try{
        this.aux = this.afDataBase.object<Chat>(`chat/${value}`).valueChanges();
        }
        catch(e)
        {
             console.log(e);
        }
        return this.aux;
    }  
    getChatP(user1: string, user2:string ): Observable<Chat[]>  {
        /*this.chats = this.afDataBase.list<Chat>(`chat/${user1}/${user2}`).valueChanges();
        if(this.chats==undefined){
            this.chats==null;
        }*/
        /*
        this.chats = this.afDataBase.list<Chat>(`chat/${user1}/${user2}`, ref => ref.orderByChild(`chatid`)).valueChanges();
        return this.chats;
}*/
    
}
