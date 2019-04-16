import { Component } from '@angular/core';
import { NavController, ModalController, AlertController } from '@ionic/angular';
import * as moment from 'moment';

import { NgCalendarModule  } from 'ionic2-calendar';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  eventSource = [];
  viewTitle: string;
  selectedDay = new Date();
  calendar = {
    mode: 'month',
    currentDate: new Date()
  };

  constructor(public navCtrl: NavController, private modalCtrl: ModalController, private alertCtrl: AlertController) { }

  onViewTitleChanged(title) {
    this.viewTitle = title;
  }
  // onEventSelected(event) {
  //   let start = moment(event.startTime).format('LLLL');
  //   let end = moment(event.endTime).format('LLLL');
  //   let alert = this.alertCtrl.create({
  //     title: '' + event.title,
  //     subTitle: 'From: ' + start + '<br>To: ' + end,
  //     buttons: ['OK']
  //   })
  //   alert.present();
  // }
  onTimeSelected(ev) {
    this.selectedDay = ev.selectedTime;
  }

}
