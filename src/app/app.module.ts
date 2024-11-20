import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms'; // Importa este módulo


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot({   
      mode: 'ios',
      scrollPadding: false,
      scrollAssist: false,
    }), 
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideHttpClient() // Nueva forma de configurar HttpClient
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
