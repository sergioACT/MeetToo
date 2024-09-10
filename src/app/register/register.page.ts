import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IonCheckbox, IonContent, IonInput, IonProgressBar, IonToast, IonToolbar } from '@ionic/angular';
import { Buttons } from './../../scripts/buttons';
import { Connection } from './../../scripts/connection';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  isVisible = 'none';
  display = 'block';
  login_display = 'none';

  @ViewChild('step1') step1?: ElementRef;
  @ViewChild('step2') step2?: ElementRef;
  @ViewChild('content') content?: IonContent;

  @ViewChild('progress') progressS?: IonProgressBar;
  @ViewChild('top') top?: ElementRef;

  @ViewChild('first_name') txt_first_name?: IonInput;
  @ViewChild('last_name') txt_last_name?: IonInput;
  @ViewChild('email') txt_email?: IonInput;
  @ViewChild('password') txt_pasword?: IonInput;
  @ViewChild('number') txt_number?: IonInput;
  @ViewChild('description') txt_description?: IonInput;
  @ViewChild('visible_description') chk_visible_description?: IonCheckbox;

  @ViewChild('login_email') txt_login_email?: ElementRef;
  @ViewChild('login_password') txt_login_pasword?: ElementRef;
  @ViewChild('login_toast') login_toast?: IonToast;


  buttons?: Buttons;
  connection?: Connection;

  constructor(private router: Router) { }

  async ngOnInit() {
    this.buttons = new Buttons();
  }

  step(next: boolean) {
    this.buttons?.step(next, this);
  }
  register_option(sing_in: boolean) {
    var display = this.buttons?.sing_in(sing_in, this.top).toString();
    if (display != null)
      this.display = display;
  }
  login_option(back: boolean) {
    if (back) {
      this.login_display = 'block';
      this.display = 'none';
    } else {
      this.login_display = 'none';
      this.display = 'block';
    }
  }

  async login() {
    debugger

    this.connection = new Connection();
    var users = await this.connection.getDocsByIds('users', {
      email: this.txt_login_email?.nativeElement.value,
      password: this.txt_login_pasword?.nativeElement.value
    });
    var route = '/tabs/tab2';

    if (users.length > 0) {
      var user = users[0];
        sessionStorage.setItem('log_user', JSON.stringify(user));
      if (!(JSON.parse(JSON.stringify(user))).complete_profile)
        route = '/tabs/tab3';
      this.router.navigate([route]);

    } else {
      this.login_toast?.present();
    }

  }

  async confirm() {

    var id = "";
    if (this.txt_email?.value != null) {
      id = btoa(this.txt_email?.value?.toString());

      this.connection = new Connection();

      this.connection.setDoc('users', id, {
        first_name: this.txt_first_name?.value?.toString(),
        last_name: this.txt_last_name?.value?.toString(),
        email: this.txt_email?.value?.toString(),
        password: this.txt_pasword?.value?.toString(),
        phone: this.txt_number?.value?.toString(),
        preferences: this.txt_description?.value?.toString(),
        visible_preferences: this.chk_visible_description?.checked,
      });
      this.isVisible = 'block';
    }
  }
}