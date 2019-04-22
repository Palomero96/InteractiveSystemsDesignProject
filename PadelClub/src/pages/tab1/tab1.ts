import { AngularFireObject } from 'angularfire2/database';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController, ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, } from 'angularfire2/database';
import { Contact } from '../../models/contact.model';
import { Reserva } from '../../models/reserva.model';
import { Observable } from 'rxjs/Observable';
import { dashCaseToCamelCase } from '@angular/compiler/src/util';



@IonicPage()
@Component({
  selector: 'page-tab1',
  templateUrl: 'tab1.html',
})
export class Tab1Page {
 
  Reserva:Reserva;
  Eventos={
    year:2019,
    month:1,
    date:1,
    hour:"00:00",
    tipo:"Reserva"
  }
  reservas:Observable<Reserva[]>;
  clases:Observable<Reserva[]>;
  reservasDia:Observable<Reserva[]>;
  eventos = [];
  eventosdia = []
  EventoDia=null;
  viewTitle: string;
  datosPerfil: AngularFireObject<Contact>;
  dia:number;
  mes:number;
  hora:string;
  reservaid:string;
  mostrar:boolean=false;

  constructor(private afAuth: AngularFireAuth, private afDataBase: AngularFireDatabase,
    private toast: ToastController,
    public navCtrl: NavController, private modalCtrl: ModalController, private alertCtrl: AlertController) {
  }

   ionViewDidLoad() {
     /* Parte del login */
     this.afAuth.authState.take(1).subscribe(data=>{
       if(data && data.email && data.uid)
       {
         this.toast.create({
           message: `Bienvenido, ${data.email}`,
           duration: 2000
         }).present();
         
         this.datosPerfil = this.afDataBase.object(`perfil/${data.uid}`);
       }
     });
     /* Parte de carga de eventos*/
     /* Recuperamos las reservas*/
    this.afAuth.authState.take(1).subscribe( async data=>{
    this.reservas= await this.afDataBase.list<Reserva>(`reserva`,ref => ref.orderByChild("usuarioid").equalTo(data.uid)).valueChanges();
    this.reservas.forEach(element => {
      for(let i=0;i<element.length;i++){
        this.EventoDia={
          year:2019,
          month:parseInt(element[i].mes)-1,
          date:parseInt(element[i].dia),
          hour:element[i].hora,
          tipo:"Reserva",
        }
        /* Obtener la fecha de hoy */
        var x = new Date();
        this.dia=x.getDate();
        this.mes=x.getMonth();
        if(this.dia==parseInt(element[i].dia) && this.mes==(parseInt(element[i].mes)-1)){
        this.eventosdia.push(this.EventoDia);
        }
      
        
        this.eventos.push(this.Eventos);
      }
    });
      /* Recuperamos las clases*/

    /* Aqui hay que hacer la query de las clases y luego tratar cada clase para que se añadan X eventos al calendario con la misma clase pero en diferentes semanas*/  
    this.clases= await this.afDataBase.list<Reserva>(`reserva`,ref => ref.orderByChild("usuarioid").equalTo(data.uid)).valueChanges();
    this.clases.forEach(element => {
      for(let i=0;i<element.length;i++){
        this.EventoDia={
          year:2019,
          month:parseInt(element[i].mes)-1,
          date:parseInt(element[i].dia),
          hour:element[i].hora,
          tipo:"Clase",
        }
        /* Obtener la fecha de hoy */
        var x = new Date();
        this.dia=x.getDate();
        this.mes=x.getMonth();
        if(this.dia==parseInt(element[i].dia) && this.mes==(parseInt(element[i].mes)-1)){

        this.eventosdia.push(this.EventoDia);
        }
      
        
        this.eventos.push(this.EventoDia);
      }
    });
    });
  
    }

  onDaySelect($event){
    console.log($event);
    this.dia=$event.date;
    this.mes=$event.month;
    this.eventosdia = [];
    /* Obtenemos las reservas*/
    for(let i=0;i<this.eventos.length;i++){
      if(this.dia==this.eventos[i].date && this.mes==this.eventos[i].month){
        this.EventoDia={
          tipo:this.eventos[i].tipo,
          hora:this.eventos[i].hour,
        }
        this.eventosdia.push(this.EventoDia);
      }
    }
  }
  onViewTitleChanged(title) {
    this.viewTitle = title;
  }
  
}
