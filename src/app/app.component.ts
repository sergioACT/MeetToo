import { Component } from '@angular/core';
import { FirebaseApp, initializeApp } from 'firebase/app'
import { environment } from 'src/environments/environment';
import { RegisterPage } from './register/register.page';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor() {
    this.initializeApp()
   }

   initializeApp(){
    const firebaseApp = initializeApp(environment.firebase);
   }
}
