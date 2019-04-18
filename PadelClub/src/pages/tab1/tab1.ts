import { AngularFireObject } from 'angularfire2/database';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController, ToastController } from 'ionic-angular';
import { NgCalendarModule } from 'ionic2-calendar';
import * as moment from 'moment';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, } from 'angularfire2/database';
import { Contact } from '../../models/contact.model';

// import { CalendarComponent } from 'ionic2-calendar/calendar';
// import { MonthViewComponent } from 'ionic2-calendar/monthview';
// import { WeekViewComponent } from 'ionic2-calendar/weekview';
// import { DayViewComponent } from 'ionic2-calendar/dayview';

@IonicPage()
@Component({
  selector: 'page-tab1',
  templateUrl: 'tab1.html',
})
export class Tab1Page {
  // eventSource;
  // viewTitle;
  // isToday: boolean;
  // calendar = {
  //     mode: 'month',
  //     currentDate: new Date()
  // }; // these are the variable used by the calendar.
  // loadEvents() {
  //     this.eventSource = this.createRandomEvents();
  // }
  // onViewTitleChanged(title) {
  //     this.viewTitle = title;
  // }
  // onEventSelected(event) {
  //     console.log('Event selected:' + event.startTime + '-' + event.endTime + ',' + event.title);
  // }
  // changeMode(mode) {
  //     this.calendar.mode = mode;
  // }
  // today() {
  //     this.calendar.currentDate = new Date();
  // }
  // onTimeSelected(ev) {
  //     console.log('Selected time: ' + ev.selectedTime + ', hasEvents: ' +
  //         (ev.events !== undefined && ev.events.length !== 0) + ', disabled: ' + ev.disabled);
  // }
  // onCurrentDateChanged(event:Date) {
  //     var today = new Date();
  //     today.setHours(0, 0, 0, 0);
  //     event.setHours(0, 0, 0, 0);
  //     this.isToday = today.getTime() === event.getTime();
  // }
  // createRandomEvents() {
  //     var events = [];
  //     for (var i = 0; i < 50; i += 1) {
  //         var date = new Date();
  //         var eventType = Math.floor(Math.random() * 2);
  //         var startDay = Math.floor(Math.random() * 90) - 45;
  //         var endDay = Math.floor(Math.random() * 2) + startDay;
  //         var startTime;
  //         var endTime;
  //         if (eventType === 0) {
  //             startTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + startDay));
  //             if (endDay === startDay) {
  //                 endDay += 1;
  //             }
  //             endTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + endDay));
  //             events.push({
  //                 title: 'All Day - ' + i,
  //                 startTime: startTime,
  //                 endTime: endTime,
  //                 allDay: true
  //             });
  //         } else {
  //             var startMinute = Math.floor(Math.random() * 24 * 60);
  //             var endMinute = Math.floor(Math.random() * 180) + startMinute;
  //             startTime = new Date(date.getFullYear(), date.getMonth(), date.getDate() + startDay, 0, date.getMinutes() + startMinute);
  //             endTime = new Date(date.getFullYear(), date.getMonth(), date.getDate() + endDay, 0, date.getMinutes() + endMinute);
  //             events.push({
  //                 title: 'Event - ' + i,
  //                 startTime: startTime,
  //                 endTime: endTime,
  //                 allDay: false
  //             });
  //         }
  //     }
  //     return events;
  // }
  // onRangeChanged(ev) {
  //     console.log('range changed: startTime: ' + ev.startTime + ', endTime: ' + ev.endTime);
  // }
  // markDisabled = (date:Date) => {
  //     var current = new Date();
  //     current.setHours(0, 0, 0);
  //     return date < current;
  // };

  eventSource = [];
  viewTitle: string;
  selectedDay = new Date();
  calendar = {
    mode: 'month',
    currentDate: new Date()
  };

  datosPerfil: Observable<{}>;

  constructor(private afAuth: AngularFireAuth, private afDataBase: AngularFireDatabase,
    private toast: ToastController,
    public navCtrl: NavController, private modalCtrl: ModalController, private alertCtrl: AlertController) {
  }

   ionViewDidLoad() {
     this.afAuth.authState.take(1).subscribe(data=>{
       if(data && data.email && data.uid)
       {
         this.toast.create({
           message: `Bienvenido, ${data.email}`,
           duration: 2000
         }).present();

         this.datosPerfil = this.afDataBase.object(`perfil/${data.uid}`).valueChanges();
       }
       else
       {
         this.toast.create({
           message: `No hay datos de usuario`,
           duration: 2000
         }).present();
       }
     })
    }
  onViewTitleChanged(title) {
    this.viewTitle = title;
  }
  onTimeSelected(ev) {
    this.selectedDay = ev.selectedTime;
  }
  
}
