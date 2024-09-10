import { Component, ElementRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { getFirestore, doc, query, collection, where, onSnapshot, and } from 'firebase/firestore'
import { FirebaseApp, initializeApp } from 'firebase/app'
import { environment } from 'src/environments/environment';
import { Connection } from 'src/scripts/connection';
import { TabsPage } from '../tabs/tabs.page';
import { ActivatedRoute, Router } from '@angular/router';
import { BluetoothLe } from '@capacitor-community/bluetooth-le';
import { User } from 'src/interfaces/user';
import { Gesture, GestureController, GestureDetail, IonCard } from '@ionic/angular';
import { Gestures } from 'src/scripts/gestures';
import { CardGesture } from 'src/scripts/card-gestures';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

export class Tab2Page extends TabsPage {
  @ViewChild('recent_card', { static: false }) recent_card?: ElementRef
  @ViewChild('content_card', { static: false }) content_card?: ElementRef
  @ViewChild('status_card', { static: false }) status_card?: ElementRef

  gestures?: Gestures;
  recent_photo: String = "";
  recent_full_name?: string;
  recent_user?: User;
  back_style?: string = '';

  direction = 'center';
  height = window.innerHeight;

  right_total = false;
  left_total = false;
  mid_width = 0;
  status = '';
  constructor(router: Router, private route: ActivatedRoute, private gestureCtrl: GestureController) {
    super(router);
  }

  override async ngOnInit() {

    this.tab1_icon_name = 'people-outline';
    this.tab2_icon_name = 'footsteps';
    this.tab3_icon_name = 'settings-outline';
    const recent_id = this.route.snapshot.paramMap.get('recent_id');
    if (recent_id != undefined) {
      this.recent_user = await this.connection.getDoc('users', recent_id) as User;
      if (this.recent_user != undefined) {
        this.recent_full_name = this.recent_user.first_name + " " + this.recent_user.last_name;
        this.recent_photo = "url(" + this.recent_user.photo + ")";

      }
    }

  }


  ngAfterViewInit() {
    if (this.content_card && this.recent_card && this.status_card)
      this.gestures = new CardGesture(this.content_card, this.recent_card,this.status_card, this.gestureCtrl, window.innerWidth, true, false);

    if (this.gestures != undefined) {
      this.gestures.initializeGesture();
      console.log('dircceion: ', this.direction);
    }

  }



}
