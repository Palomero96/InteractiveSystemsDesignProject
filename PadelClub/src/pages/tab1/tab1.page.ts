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
  viewTitle = 'Calendario';
  selectedDay = new Date();
  calendar = {
    mode: 'month',
    currentDate: new Date()
  };

  constructor(public navCtrl: NavController, private modalCtrl: ModalController, private alertCtrl: AlertController) { }

}
