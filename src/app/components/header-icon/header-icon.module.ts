import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderIconComponent } from './header-icon.component';
import { IonicModule } from '@ionic/angular';


@NgModule({
  declarations: [HeaderIconComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [HeaderIconComponent]
})
export class HeaderIconModule { }
