import { Component, Input, OnInit } from '@angular/core';
import { Browser } from '@capacitor/browser';
import { ISocial } from 'src/interfaces/iuser';

@Component({
  selector: 'app-mini-modal',
  templateUrl: './mini-modal.component.html',
  styleUrls: ['./mini-modal.component.scss'],
})
export class MiniModalComponent implements OnInit {
  @Input() medias: Array<ISocial> | undefined;
  @Input() visible: boolean | undefined;

  icons: Array<any> = new Array;
  constructor() { }

  ngOnInit() {
    debugger
    if (this.medias) {
      this.medias.forEach(media => {
        this.icons.push({ name: 'logo-' + media.media_key, link: media.media_value, type: media.media_key })
      });
    }

  }

  open_app(url :string) {
    Browser.open({ url });
  }

}
