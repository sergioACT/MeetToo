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
  @ViewChild('terms_and_conditions') chk_terms_and_conditions?: IonCheckbox;

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
  width?: number;
  all_section?: string;
  page_width?: string;

  constructor(private toastController: ToastController, private router: Router, private client: HttpClient) {
    // Inicializa la instancia de Beacon
    this.geolocation = new Geolocations(this.toastController, client);
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.all_section = (this.width * 6) + "px";
    this.page_width = (this.width) + "px";

    this.initializeKeyboardListeners();
  }



  async ngOnInit() {
    this.ui_actions = new UIActions();
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
    this.content?.scrollByPoint(-(this.width ?? 0), 0, 300);

  }

  next(section: number) {
    this.step1?.nativeElement.classList.add("disbaled-content");
    this.step2?.nativeElement.classList.add("disbaled-content");
    this.step3?.nativeElement.classList.add("disbaled-content");
    this.step4?.nativeElement.classList.add("disbaled-content");

    switch (section) {
      case 1:
        if (this.txt_email?.value?.toString() != "" && this.txt_pasword?.value?.toString() != "") {
          this.content?.scrollByPoint((this.width ?? 0), 0, 300);
          this.step1?.nativeElement.classList.remove("disbaled-content");
        } 
        break;
      case 2:
        if (this.txt_first_name?.value?.toString() != "" && this.txt_last_name?.value?.toString() != "" && this.txt_number?.value?.toString() != "") {
          this.content?.scrollByPoint((this.width ?? 0), 0, 300);
          this.step1?.nativeElement.classList.remove("disbaled-content");
        }
        break;
      case 3:
        if (this.day?.value?.toString() != "" && this.month?.value?.toString() != "" && this.year?.value?.toString() != "") {
          this.content?.scrollByPoint((this.width ?? 0), 0, 300);
          this.step1?.nativeElement.classList.remove("disbaled-content");
        } 
        break;        
      case 4:
        if (this.chk_terms_and_conditions?.checked) {
          this.content?.scrollByPoint((this.width ?? 0), 0, 300);
          this.step1?.nativeElement.classList.remove("disbaled-content");
        } 
        break; 
    }
  }

  register_option(sing_in: boolean) {
    if (sing_in)
      this.content?.scrollByPoint(this.width ?? 0, 0, 300);
    else
      this.content?.scrollByPoint(-(this.width ?? 0), 0, 300);

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

  async fn_login(email?: string, password?: string) {

    this.connection = new Connection();
    var users = await this.connection.getDocsByIds('users', {
      email: email?.toLowerCase(),
      password: password
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
      this.content?.scrollByPoint(this.width ?? 0, 0, 300);

      setTimeout(() => {
        this.fn_login(this.txt_email?.value?.toString(), this.txt_pasword?.value?.toString());
      }, 3000);
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

  }

}