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
  alumnosProvisional: Observable<{}[]>;
  alumnosFinal: Observable<{}[]>;
  ampliarAnterior: number;

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
          this.clases=this.afDataBase.list<Clase>(`clase`, ref => ref.orderByChild(`/alumnos_final/${this.Perfil.id}/id`).equalTo(this.Perfil.id)).valueChanges();
          console.log("Mis clases " +this.clases);
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
        this.afDataBase.object(`clase/${objClase.claseid}/alumnos_provisional/${this.Perfil.id}/`).set(
          {
            id:this.Perfil.id,
            nombre:this.Perfil.nombre+ " " + this.Perfil.apellidos
          });
      })
    }

  ampliarClase(i,clase) { 
    if(i!=this.ampliarAnterior)
    {
      this.cerrarClaseAnterior();
      this.afAuth.authState.take(1).subscribe( async data=>
      {
        //recogemos los alumnos provisionales
        console.log("TestObservable    "+this.afDataBase.list<{}>(`clase/${clase.claseid}/alumnos_provisional/`,ref => ref.orderByChild(`nombre`)).valueChanges())
        this.alumnosProvisional = this.afDataBase.list<{}>(`clase/${clase.claseid}/alumnos_provisional/`,ref => ref.orderByChild(`nombre`)).valueChanges();
        this.alumnosFinal = this.afDataBase.list<{}>(`clase/${clase.claseid}/alumnos_final/`,ref => ref.orderByChild(`nombre`)).valueChanges();
      });
      this.ampliarAnterior=i;
      this.mostrado[i] = !this.mostrado[i];
    }
    else
    {
      this.mostrado[i] = !this.mostrado[i];
      this.ampliarAnterior=null;
    }
  }
  cerrarClaseAnterior()
  {
    this.mostrado[this.ampliarAnterior] = !this.mostrado[this.ampliarAnterior];
  }

  addFinalAlumno(alumno,clase)
  {
    this.afAuth.authState.take(1).subscribe(auth => {
      this.afDataBase.object(`clase/${clase.claseid}/alumnos_final/${alumno.id}/`).set({id: alumno.id, nombre:alumno.nombre});
      this.afDataBase.object(`perfil/${alumno.id}/clase/${clase.claseid}/`).set(clase.claseid);
    })
    this.removePorvisionalAlumno(alumno,clase);
  }

  removePorvisionalAlumno(alumno,clase)
  {
    this.afAuth.authState.take(1).subscribe(auth => {
      this.afDataBase.object(`clase/${clase.claseid}/alumnos_provisional/${alumno.id}/`).remove();
    })
  }

  removeFinalAlumno(alumno,clase)
  {
    this.afAuth.authState.take(1).subscribe(auth => {
      this.afDataBase.object(`clase/${clase.claseid}/alumnos_final/${alumno.id}/`).remove();
      this.afDataBase.object(`clase/${clase.claseid}/alumnos_provisional/${alumno.id}/`).set(
        {
          id:alumno.id,
          nombre:alumno.nombre
        });
      this.afDataBase.object(`perfil/${alumno.id}/clase/${clase.claseid}/`).remove();
    })
  }

}
