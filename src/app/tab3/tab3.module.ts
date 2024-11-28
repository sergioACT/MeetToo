import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab3Page } from './tab3.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { Tab3PageRoutingModule } from './tab3-routing.module';
import { SocialMediaItemComponent } from '../components/profile-components/social-media-item/social-media-item.component';
import { HeaderIconComponent } from '../components/header-icon/header-icon.component';
import { HeaderIconModule } from '../components/header-icon/header-icon.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab3PageRoutingModule,
    HeaderIconModule
  ],
  declarations: [Tab3Page, SocialMediaItemComponent]
})
export class Tab3PageModule {}
