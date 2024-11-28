import { IonicModule, IonRouterOutlet, ModalController } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
 import { HeaderIconComponent } from '../components/header-icon/header-icon.component';
import { Tab1PageRoutingModule } from './tab1-routing.module';
import { FriendItemComponent } from '../components/friend-item/friend-item.component';
import { MiniModalComponent } from '../components/mini-modal/mini-modal.component';
import { HeaderIconModule } from '../components/header-icon/header-icon.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab1PageRoutingModule,
    HeaderIconModule
  ],
  providers: [
    IonRouterOutlet,
  ],
  declarations: [Tab1Page, FriendItemComponent, MiniModalComponent]
})
export class Tab1PageModule { }
