import { Reserva } from "../models/reserva.model";
import { Injectable } from "@angular/core";
import { AngularFireDatabase, AngularFireList, AngularFireObject} from 'angularfire2/database';

@Injectable()

export class ReservaService{
    reservas:AngularFireList<Reserva> =null;
    reservasUser:AngularFireList<Reserva> =null;
    reserva: Reserva=null;
    Usuario: string;
    constructor(private db:AngularFireDatabase){
    }
    getAllReservas():AngularFireList<Reserva>{
        this.reservas=this.db.list<Reserva>("reservas");
        return this.reservas;
    }
    addMensaje(value: Reserva, Usuario){
        this.reservas=this.db.list<Reserva>("reservas");
        return this.reservas.push(value);
    }
    //Metodo para recuperar las reservas de un Usuario
    //No estoy seguro de que funcione, deberia de recuperar los datos de las reservas de un usuario 
    getUserReservas(Usuario):AngularFireList<Reserva>{ 
        this.reservas = this.db.list('reservas', ref => ref.orderByChild('userid').equalTo(Usuario));
        return this.reservas;
    }

}