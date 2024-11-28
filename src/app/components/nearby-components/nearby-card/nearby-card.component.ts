import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { IUser } from 'src/interfaces/iuser';
import { Utils } from 'src/scripts/utils';

@Component({
  selector: 'app-nearby-card',
  templateUrl: './nearby-card.component.html',
  styleUrls: ['./nearby-card.component.scss'],
})
export class NearbyCardComponent implements OnInit {
  @Input() recent_user: IUser | undefined;

  @ViewChild('recent_card', { static: false }) recent_card?: ElementRef;
  @ViewChild('yes', { static: false }) yes_element?: ElementRef;
  @ViewChild('no', { static: false }) no_element?: ElementRef;
  recent_full_name?: string;
  recent_photo?: string;
  constructor() { }

  ngOnInit() {
    if (this.recent_user) {
      this.recent_full_name = `${this.recent_user.first_name} ${this.recent_user.last_name}`;
      this.recent_photo = Utils.getBase64Url(this.recent_user.photo);
    }


  }

}
