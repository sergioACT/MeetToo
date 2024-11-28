import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IonInput } from '@ionic/angular';
import { ISocial, IUser } from 'src/interfaces/iuser';
import { Connection } from 'src/scripts/connection';
import { Facebook } from 'src/scripts/facebook';
import { Session } from 'src/scripts/sesson';

@Component({
  selector: 'app-social-media-item',
  templateUrl: './social-media-item.component.html',
  styleUrls: ['./social-media-item.component.scss'],
})
export class SocialMediaItemComponent implements OnInit {
  @Input() media: ISocial | undefined;
  @Input() user: IUser | undefined;
  @Input() session: Session | undefined;
  @Input() connection: Connection | undefined;

  icon_name?: string;
  display_input?: string = 'none';
  display_label?: string = 'block';
  @ViewChild('txt_phone') txt_phone?: IonInput;

  constructor() { }

  ngOnInit() {
    this.icon_name = "logo-" + this.media?.media_key.toLowerCase();

    if (this.media?.media_key == "Whatsapp")
    {
      this.display_input = 'block';
      this.display_label = 'none';
    }

  }

  async open() {
    switch (this.media?.media_key) {
      case "Facebook":
        await this.open_facebook();
        break;
    }
  }

   async update_number(event: any) {
    debugger
    const regex = /^\d{10}$/;
    if (event.target.value != null && event.target.value.toString().trim() != "") {
      var text = event.target.value.toString().trim();

      if (regex.test(text)) {

        if (this.user && this.session && this.connection) {
          this.user.phone = text;
          this.session.update(this.user);
          await this.connection.updateDoc('users', this.user?.id.toString(), { phone: text });

          if (this.txt_phone ) {
            this.txt_phone.value = "";
            this.txt_phone.placeholder = text;
          }

        }
      }
    }
  }

  async open_facebook() {
    try {
      var facebook = new Facebook();
      await facebook.loginWithFacebook();
    }
    catch (ex) {
      console.log(ex);
    }
  }


}
