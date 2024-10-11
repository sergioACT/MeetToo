import { Component, ElementRef, ViewChild, viewChild } from '@angular/core';
import { TabsPage } from '../tabs/tabs.page';
import { Router } from '@angular/router';
import { Browser } from '@capacitor/browser';
import { ActionSheetController, createAnimation, IonNav, IonTitle, ModalController, ToastController } from '@ionic/angular';
import { Tab2Page } from '../tab2/tab2.page';
import { animation } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Geolocations } from 'src/scripts/geolocation';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page extends TabsPage {

  @ViewChild('friends_title') friends_title? : HTMLIonTitleElement;

  is_open_selector?: boolean = false;
  selection_display = 'none';


  modalController?: ModalController;
  presentingElement: any;
  selecteds?: Array<any>;

  public alertButtons = [
    {
      text: 'Cancel',
      role: 'cancel',
      handler: () => {
      },
    },
    {
      text: 'OK',
      role: 'confirm',
      handler: () => {
        this.log_out(); // Llamar al método desde aquí
      }
    },
  ];
  constructor(toastController: ToastController, router: Router, geolocation: Geolocations) {
    super(toastController, router,geolocation);
    this.presentingElement = document.querySelector('.comp');

    this.selection_display = 'none';

  }
  setResult(ev: any) {
    console.log(`Dismissed with role: ${ev.detail.role}`);
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

  open_selector() {
    if (!this.is_open_selector) {
      const icon = document.getElementById("popover-button") as HTMLIonIconElement;
      icon.name = "close";
      this.selection_display = 'block';
      this.is_open_selector = true;
    }
  }

  close_selector(){
  if(this.is_open_selector){
    const icon = document.getElementById("popover-button") as HTMLIonIconElement;

    icon.name = "ellipsis-horizontal";
    this.selection_display = 'none';
    this.is_open_selector = false;
  }
  }

  
  select(friendid: String) {
    console.log(friendid);
    debugger
    const checkbox = document.getElementById(friendid.toString()) as HTMLIonCheckboxElement;
    if (checkbox) {
      checkbox.checked = true; // Selecciona el checkbox
    }
    this.selecteds?.push(friendid);

    if(this.friends_title)
    this.friends_title.textContent= this.selecteds?.length + " Seleccionados";
  }
}
