import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController } from 'ionic-angular';

import { NgCalendarModule } from 'ionic2-calendar';
import * as moment from 'moment';

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
  eventSource = [];
  viewTitle: string;
  selectedDay = new Date();
  calendar = {
    mode: 'month',
    currentDate: new Date()
  };
  
  constructor(public navCtrl: NavController, private modalCtrl: ModalController, private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Tab1Page');
  }
  onViewTitleChanged(title) {
    this.viewTitle = title;
  }
  onTimeSelected(ev) {
    this.selectedDay = ev.selectedTime;
  }

}
