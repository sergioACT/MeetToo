import { Component, ElementRef, ViewChild, } from '@angular/core';
import { Connection } from 'src/scripts/connection';
import { Gesture, GestureController, IonContent, IonIcon, IonInput, IonModal, IonTabs, IonTextarea, IonToggle, ModalController, ToastController } from '@ionic/angular';
import { Router, Event } from '@angular/router';
import { IUser } from '../../interfaces/iuser';
import { Meetings } from '../../interfaces/meetings';
import { UIActions } from 'src/scripts/uiactions';
import { Session } from 'src/scripts/sesson';
import { User } from 'src/scripts/user';
import { Geolocations } from 'src/scripts/geolocation';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})

export class TabsPage {
  session: Session;
  user?: IUser;
  fullname: String = "";
  friends?: Array<IUser>;
  all_friends?: Array<IUser>;
  meetings?: Meetings;
  actual_meetings?: Array<IUser>;
  connection: Connection;
  router: Router;
  ui_actions?: UIActions;
  usr: User | undefined;
user_meet: any;
geolocation?: Geolocations;


  description_display = 'block'
  logout_button_display = 'flex'
  description_display_large = 'none'
  icon_name = 'log-in-outline';
  tab1_icon_name = 'people-outline';
  tab2_icon_name = 'footsteps-outline';
  tab3_icon_name = 'accessibility-outline';
  friend_visble_media = 'none';


  is_open = false;
  modal_photo = "";

  link_p: string = "";
  link_w: string = "";
  link_i: string = "";
  link_f: string = "";
  link_x: string = "";


  //[START] UI Components
  @ViewChild('social_modal') social_modal?: IonModal;
  @ViewChild('image_modal') image_modal?: IonModal;
  @ViewChild('upload_photo_modal') upload_photo_modal?: IonModal;


  @ViewChild('profile_editor') profile_editor?: ElementRef;
  @ViewChild('profile_data') profile_data?: ElementRef;
  @ViewChild('profile_icon') profile_icon?: ElementRef;
  @ViewChild('profile_fullname') profile_fullname?: ElementRef;
  @ViewChild('txt_nickname') txt_nickname?: IonInput;
  @ViewChild('txt_description') txt_description?: IonTextarea;
  @ViewChild('tabs', { static: false }) tabs?: ElementRef;
  //[END] UI Components

  constructor(private toastController: ToastController,router: Router, geolocation: Geolocations) {
    this.geolocation = geolocation;
    this.session = new Session('log_user');
    this.router = router;
    this.connection = new Connection();
    this.ui_actions = new UIActions();
    var user_session = this.session.get();
    if (user_session == null)
      return;

    this.user = JSON.parse(user_session) as IUser;

    if (!this.user)
      return;
    if (this.user.photo == undefined)
      this.user.photo = './assets/images/no-user.png'

    this.usr = new User(this.user);
    this.usr.connection = this.connection;

  }

  async ngOnInit() {
    if (this.user && this.usr) {
      this.fullname = this.usr.get_full_name();
      this.all_friends = await this.usr.get_friends();
      this.friends = this.all_friends;
      this.usr.firends = this.all_friends;
      this.actual_meetings = await this.usr.get_meetings();

    }
  }



  on_checked(event: CustomEvent, tag: string) {
    if (this.user != null) {
      switch (tag) {
        case 'media':
          this.user.visible_media = event.detail.checked;
          break;
        case 'preferences':
          this.user.visible_preferences = event.detail.checked;
          break;
      }

      this.connection.updateDoc('users', this.user?.id.toString(), this.user);
      this.session.update(this.user);
    }
  }

  log_out() {
    if (!this.is_open) {
      sessionStorage.removeItem('log_user');
      this.router.navigate(['/register']);
    } else {

      if (this.user != null) {
        if (this.txt_nickname?.value != null && this.txt_nickname?.value.toString().trim() != "") {
          this.user.nick_name = this.txt_nickname.value?.toString();
          this.txt_nickname.placeholder = this.txt_nickname.value?.toString();
          this.txt_nickname.value = '';
        }
        if (this.txt_description?.value != null && this.txt_description?.value.toString().trim() != "") {
          this.user.preferences = this.txt_description.value?.toString();
          this.txt_description.placeholder = this.txt_description.value?.toString();
          this.txt_description.value = '';
        }

        this.connection.updateDoc('users', this.user.id.toString(), this.user);
        this.session.update(this.user);
        this.icon_name = 'bookmark';
      }

    }
  }

  openModal(is_media: boolean, id?: String) {
    if (is_media) {
      this.social_modal?.present();
      var friend = this.friends?.find(x => x.email.toLocaleLowerCase() == id?.toLocaleLowerCase());

      if (friend?.visible_media)
        this.friend_visble_media = 'block'

      if (friend != undefined) {
        if (friend.social_media != undefined) {
          this.link_f = friend.social_media[0].facebook;
          this.link_i = friend.social_media[0].instagram;
          this.link_x = friend.social_media[0].snapchat;
          this.link_w = friend.phone.toString();
          this.link_p = friend.phone.toString();
        }
      }

    }
    else {
      if (this.is_open) {
        this.image_modal?.present();
        if (this.user != null)
          this.modal_photo = this.user?.photo.toString();

      }
    }
  }

  open_modal() {
    this.upload_photo_modal?.present();
  }

  open_editor() {
    this.ui_actions?.open_editor(this);
  }

  close_editor() {
    this.ui_actions?.close_editor(this);
  }

  search(event: any) {
    if (event.target.value == null || event.target.value.toString().trim() == "")
      this.friends = this.all_friends;
    if (this.all_friends != null)
      this.friends = this.all_friends.filter(x => x.first_name.toLowerCase().includes(event.target.value));
  }

}

