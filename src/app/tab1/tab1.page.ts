import { Component, ViewChild, viewChild } from '@angular/core';
import { TabsPage } from '../tabs/tabs.page';
import { Router } from '@angular/router';
import { Browser } from '@capacitor/browser';
import { ActionSheetController, createAnimation, IonNav, ModalController } from '@ionic/angular';
import { Tab2Page } from '../tab2/tab2.page';
import { animation } from '@angular/animations';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page extends TabsPage {
  modalController?: ModalController;
  presentingElement: any;

  constructor(router: Router) {
    super(router);
    this.presentingElement = document.querySelector('.comp');
  }
  
  open_app(user_name: string, app: string) {
    var url = "";
    switch (app) {
      case "fb":
        url = "https://m.me/" + user_name;
        break;
      case "wh":
        url = "https://wa.me/" + user_name;
        break;
      case "ig":
        url = "https://ig.me/" + user_name;
        break;
      case "ph":
        url = "tel:" + user_name;
        break;
      case "x":
        url = "https://x.com/messages/compose?recipient_id=" + user_name;
        break;

    }
    Browser.open({ url });
  }

  open_recent(recent_id: String) {
    this.router.navigate(["/tabs/tab2", recent_id]);
  }
}
