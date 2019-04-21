import { Clase } from './../../models/clase.model';
import { Component } from '@angular/core';
import { Modal, ModalOptions, IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Contact } from '../../models/contact.model';

@IonicPage()
@Component({
  selector: 'page-tab3',
  templateUrl: 'tab3.html',
})
export class Tab3Page {
  mostrado:boolean[]=[];
  esProfesor: boolean;
  myUserData: {};
  datosPerfil: AngularFireObject<Contact>;;
  Perfil:Contact;
  rol:string;
  clases:Observable<Clase[]>;
  clasesTodas:Observable<Clase[]>;
  claseParaMostrar : Clase;
  idAlumnos: string[];
  alumnosProvisional: Contact[]=[];

  constructor(public navCtrl: NavController,private afAuth: AngularFireAuth, private afDataBase: AngularFireDatabase, private crearClaseMod: ModalController, public navParams: NavParams) {
    this.esProfesor = false;
  }

  ionViewWillEnter() {
    this.mostrado= [];
    this.afAuth.authState.take(1).subscribe( async data=>{
      //De esta manera el id sera el mismo da igual quien cree la conversacion
        this.datosPerfil = this.afDataBase.object(`perfil/${data.uid}`);
        console.log(this.datosPerfil)
        this.datosPerfil.snapshotChanges().subscribe( async action => {
        this.Perfil = await action.payload.val();
        //asignamos la variable esProfesor para mostrar una cosa u otra en el html
        if(this.Perfil.rol=="Profesor"){
          this.esProfesor=true;
          this.clases=this.afDataBase.list<Clase>(`clase`,ref => ref.orderByChild(`profesor`).equalTo(data.uid)).valueChanges();
          console.log(this.clases);
        } else{
          //Aqui tendremos que obtener las clases en las que se puede apuntar el alumno
          this.clasesTodas=this.afDataBase.list<Clase>(`clase`, ref => ref.orderByChild(`nivel`).equalTo(this.Perfil.nivel)).valueChanges();
        
        }
        
        });
      });
      
  }

  crearClase() {
    if (this.esProfesor) {
      const myModalOptions: ModalOptions = {
        enableBackdropDismiss: false
      }

      this.myUserData = {
        userId: 'profesor1',
        userName: 'nombre_profesor1',
      }

      const myModal = this.crearClaseMod.create('CrearClasePage', { data: this.myUserData }, myModalOptions);
      
      myModal.present();
    }

  }
    
  unirAUnaClase(objClase)
    {
      this.afAuth.authState.take(1).subscribe(auth => {
        this.afDataBase.object(`clase/${objClase.claseid}/alumnos_provisional/${this.Perfil.id}/`).set(this.Perfil.id);
      })
    }

  ampliarClase(i,clase) { 
    this.alumnosProvisional=[];
    this.afAuth.authState.take(1).subscribe( async data=>
    {
      //De esta manera el id sera el mismo da igual quien cree la conversacion
      this.afDataBase.object(`clase/${clase.claseid}/alumnos_provisional`).snapshotChanges().subscribe( async action => {
        for(var k in action.payload.val()) {
          console.log(action.payload.val()[k])
          this.afDataBase.object(`perfil/${action.payload.val()[k]}`).snapshotChanges().subscribe( async action2 => {
              console.log(action2.payload.val());
              this.alumnosProvisional.push(action2.payload.val());
          })
       }
       console.log(this.alumnosProvisional)
      })
    });
    this.mostrado[i] = !this.mostrado[i];
  }

}
