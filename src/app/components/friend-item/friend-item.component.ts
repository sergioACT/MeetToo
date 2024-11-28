import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IUser } from 'src/interfaces/iuser';
import { MiniModalComponent } from '../mini-modal/mini-modal.component';

@Component({
  selector: 'app-friend-item',
  templateUrl: './friend-item.component.html',
  styleUrls: ['./friend-item.component.scss'],
})
export class FriendItemComponent implements OnInit {
  @Input() friend: IUser | undefined;
  @Input() selected: string | undefined;
  full_name?: string;
  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {

    this.full_name = this.friend?.first_name + " " + this.friend?.last_name;

  }

  async open() {

    const data = {
      medias: this.friend?.social_media,
      visible: this.friend?.visible_media
    };

    const mini_modal = await this.modalCtrl.create({
      component: MiniModalComponent,
      componentProps: data,
      cssClass: 'modal-chat',
      initialBreakpoint: 0.20,
      breakpoints: [0, 0.20],
      handleBehavior: "cycle"
    });
  

    await mini_modal.present();

  }

}
