import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { getFirestore, doc, query, collection, where, onSnapshot, and } from 'firebase/firestore'
import { FirebaseApp, initializeApp } from 'firebase/app'
import { environment } from 'src/environments/environment';
import { Connection } from 'src/scripts/connection';
import { TabsPage } from '../tabs/tabs.page';
import { ActivatedRoute, Router } from '@angular/router';
import { BluetoothLe } from '@capacitor-community/bluetooth-le';
import { IUser } from 'src/interfaces/iuser';
import { Gesture, GestureController, GestureDetail, IonCard, ToastController } from '@ionic/angular';
import { Gestures } from 'src/scripts/gestures';
import { CardGesture } from 'src/scripts/card-gestures';
import { HttpClient } from '@angular/common/http';
import { Geolocations } from 'src/scripts/geolocation';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

export class Tab2Page extends TabsPage {

  @ViewChild('recent_card', { static: false }) recent_card?: ElementRef;
  @ViewChild('status_card', { static: false }) status_card?: ElementRef;
  @ViewChild('card_buttons', { static: false }) card_buttons?: ElementRef;
  @ViewChild('yes', { static: false }) yes_element?: ElementRef;
  @ViewChild('no', { static: false }) no_element?: ElementRef;

  gestures?: Gestures;
  recent_photo: String = "";
  recent_full_name?: string;
  recent_user?: IUser;
  back_style?: string = '';
  recent_id?: String;


  constructor(toastController: ToastController, router: Router, geolocation: Geolocations, private route: ActivatedRoute, private gestureCtrl: GestureController) {
    super(toastController, router, geolocation);
  }

  override async ngOnInit() {

    debugger
    if (this.user && !this.recent_id) {
      this.user_meet = await this.geolocation?.sendLocation(this.user);
      console.log("encontrado... ", this.user_meet)
    }

    this.recent_id = this.route.snapshot.paramMap.get('recent_id')?.toString();
    var id = undefined;
    if (!this.recent_id) {
      id = this.user_meet.nearbyDevices[0].id;
      this.recent_id = id;
    }
    else
      id = this.recent_id;

    this.recent_user = await this.usr?.get_recents(id) as IUser;
    if (this.recent_user != undefined) {
      this.recent_full_name = this.recent_user.first_name + " " + this.recent_user.last_name;
      this.recent_photo = "url(" + this.recent_user.photo + ")";
    }
    this.recent_card?.nativeElement.addEventListener('touchmove', (e: TouchEvent) => {
      e.preventDefault(); // Previene el comportamiento de pull-to-refresh
    });



  }


  async ngAfterViewInit() {
    if (this.recent_card && this.status_card && this.yes_element && this.no_element && this.card_buttons)
      this.gestures = new CardGesture(this,this.card_buttons, this.recent_card, this.status_card, this.gestureCtrl, this.yes_element, this.no_element, window.innerWidth, true, false);
    if (this.gestures != undefined) {
      this.gestures.initializeGesture();
    }
  }

  async accept() {
    if (this.recent_id && this.user && this.usr) {
      this.usr.session = this.session;
      this.usr.accept_friend(this.recent_id.toString());

    }
  }

  finish() {
    this.status_card?.nativeElement.remove();
  }

  @HostListener('touchmove', ['$event'])
  onTouchMove(event: TouchEvent) {
    event.preventDefault(); // Previene el movimiento de la pantalla
  }
  @HostListener('touchstart', ['$event'])
  onTouchStart(event: TouchEvent) {
    document.body.style.overflow = 'hidden';
  }

  @HostListener('touchend', ['$event'])
  onTouchEnd(event: TouchEvent) {
    document.body.style.overflow = '';
  }


}
