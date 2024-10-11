import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IonCheckbox, IonContent, IonInput, IonProgressBar, IonToast, IonToolbar } from '@ionic/angular';
import { UIActions } from '../../scripts/uiactions';
import { Connection } from './../../scripts/connection';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Geolocations } from 'src/scripts/geolocation';
import { Keyboard } from '@capacitor/keyboard';
import { HttpClient } from '@angular/common/http';


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
  @ViewChild('step3') step3?: ElementRef;
  @ViewChild('step4') step4?: ElementRef;

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

  @ViewChild('day') day?: IonInput;
  @ViewChild('month') month?: IonInput;
  @ViewChild('year') year?: IonInput;

  @ViewChild('login_email') txt_login_email?: ElementRef;
  @ViewChild('login_password') txt_login_pasword?: ElementRef;
  @ViewChild('login_toast') login_toast?: IonToast;

  message?: string;
  geolocation: Geolocations;
  ui_actions?: UIActions;
  connection?: Connection;
  height?: number;

  constructor(private toastController: ToastController, private router: Router, private client: HttpClient) {
    // Inicializa la instancia de Beacon
    this.geolocation = new Geolocations(this.toastController,client);
    this.height = window.innerHeight;
    this.initializeKeyboardListeners();
  }



  async ngOnInit() {
    this.ui_actions = new UIActions();

    var coordinates = await this.geolocation.getLocation();


  }



  back(section: number) {

    this.step1?.nativeElement.classList.add("disbaled-content");
    this.step2?.nativeElement.classList.add("disbaled-content");
    this.step3?.nativeElement.classList.add("disbaled-content");
    this.step4?.nativeElement.classList.add("disbaled-content");

    switch (section) {
      case 1:
        this.step1?.nativeElement.classList.remove("disbaled-content");
        break;
      case 2:
        this.step2?.nativeElement.classList.remove("disbaled-content");
        break;
      case 3:
        this.step3?.nativeElement.classList.remove("disbaled-content");
        break;
      case 4:
        this.step3?.nativeElement.classList.remove("disbaled-content");
        break;
    }

    this.content?.scrollByPoint(0, -(this.height ?? 0), 300);
  }

  next(section: number) {
    this.step1?.nativeElement.classList.add("disbaled-content");
    this.step2?.nativeElement.classList.add("disbaled-content");
    this.step3?.nativeElement.classList.add("disbaled-content");
    this.step4?.nativeElement.classList.add("disbaled-content");

    switch (section) {
      case 1:
        this.step1?.nativeElement.classList.remove("disbaled-content");
        break;
      case 2:
        this.step2?.nativeElement.classList.remove("disbaled-content");
        break;
      case 3:
        this.step3?.nativeElement.classList.remove("disbaled-content");
        break;
      case 4:
        this.step3?.nativeElement.classList.remove("disbaled-content");
        break;
    }
    this.content?.scrollByPoint(0, this.height ?? 0, 300);
  }

  register_option(sing_in: boolean) {
    var display = this.ui_actions?.sing_in(sing_in, this.top).toString();
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

    this.connection = new Connection();
    var users = await this.connection.getDocsByIds('users', {
      email: this.txt_login_email?.nativeElement.value.toString().toLowerCase(),
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
      var birthdate = undefined;
      if (this.year?.value && this.month?.value && this.day?.value)
        birthdate = new Date(
          parseInt(this.year.value.toString()),
          parseInt(this.month.value.toString()) - 1,
          parseInt(this.day.value.toString())
        );

      this.connection.setDoc('users', id, {
        first_name: this.txt_first_name?.value?.toString(),
        last_name: this.txt_last_name?.value?.toString(),
        email: this.txt_email?.value?.toString(),
        password: this.txt_pasword?.value?.toString(),
        phone: this.txt_number?.value?.toString(),
        preferences: this.txt_description?.value?.toString(),
        visible_preferences: this.chk_visible_description?.checked,
        age: this.calculateAge(birthdate ?? new Date())

      });
      this.isVisible = 'block';
    }
  }

  calculateAge(birthdate: Date) {
    let timeDiff = Math.abs(Date.now() - birthdate.getTime());
    let age = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365.25);
    console.log(age)
    return age;
  }

  initializeKeyboardListeners() {
    Keyboard.addListener('keyboardWillShow', (info) => {
      console.log('El teclado se está abriendo:', info);
      const content = document.querySelector('.register-content') as HTMLElement;
      if (content) {
        content.style.height = `${70}vh`;
      }
    });
  
    // Keyboard.addListener('keyboardWillHide', () => {
    //   console.log('El teclado se está cerrando');
    //   const content = document.querySelector('.register-content') as HTMLElement;
    //   if (content) {
    //     content.style.paddingBottom = '0';
    //   }
    // });
  }

}