import { Component, ElementRef, ViewChild } from '@angular/core';
import { TabsPage } from '../tabs/tabs.page';
import { Router } from '@angular/router';
import { ActionSheetController, IonActionSheet, IonInput, IonModal, IonToggle, ToastController } from '@ionic/angular';
import { Browser } from '@capacitor/browser';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Facebook } from 'src/scripts/facebook';
import { HttpClient } from '@angular/common/http';
import { Geolocations } from 'src/scripts/geolocation';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page extends TabsPage {
  @ViewChild('new_photo_modal') new_photo_modal?: IonModal;
  @ViewChild('action_sheet') action_sheet?: IonActionSheet;
  @ViewChild('txt_phone') txt_phone?: IonInput;
  @ViewChild('txt_whatsapp') txt_whatsapp?: IonInput;

  presentingElement: any;
  new_photo = '';

  constructor(toastController: ToastController, router: Router, geolocation: Geolocations, private actionSheetCtrl: ActionSheetController) {
    super(toastController, router, geolocation);
    this.presentingElement = document.querySelector('.comp');
  }


  async open_facebook() {
    try {
      debugger
      console.log("clickeado");
      var facebook = new Facebook();
      await facebook.loginWithFacebook();
    }
    catch (ex) {
      console.log(ex);
    }
  }

  canDismiss() {
    return true;
  };

  async open_camera() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64,  // Puede ser Uri, Base64, o DataUrl
      source: CameraSource.Camera,  // Camera para abrir la cámara
    });

    const imageUrl = `data:image/${image.format};base64,${image.base64String}`;

    this.new_photo = imageUrl;
    this.image_modal?.dismiss();
    this.upload_photo_modal?.dismiss();
    this.new_photo_modal?.present();
    console.log('Imagen capturada:', imageUrl);
  }

  async open_gallery() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64,  // Puede ser Uri, Base64, o DataUrl
      source: CameraSource.Photos,  // Photos para abrir la galería
    });

    const imageUrl = `data:image/${image.format};base64,${image.base64String}`;

    this.new_photo = imageUrl;
    this.image_modal?.dismiss();
    this.upload_photo_modal?.dismiss();
    this.new_photo_modal?.present();

    console.log('Imagen seleccionada:', imageUrl);
  }

  async save_photo() {
    if (this.user != undefined) {
      this.user.photo = this.new_photo;
      this.session.update(this.user);
      await this.connection.updateDoc('users', this.user?.id.toString(), { photo: this.new_photo });
      this.new_photo_modal?.dismiss();

      this.action_sheet?.present();
    }
  }

  async present_action_sheet() {
    const actionSheet = await this.actionSheetCtrl?.create({
      buttons: [
        {
          text: 'Eliminar foto',
          handler: () => {
            this.delete_photo(); // Llamar al método desde aquí
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel'
        }
      ]
    });
    await actionSheet.present();
    this.upload_photo_modal?.dismiss();
    this.action_sheet?.present();
  }

  async delete_photo() {
    if (this.user != undefined) {
      this.user.photo = './assets/images/no-user.png';
      this.session.update(this.user);
      await this.connection.updateDoc('users', this.user.id.toString(), { photo: this.new_photo });
      this.session.update(this.user);
      this.new_photo_modal?.dismiss();
      this.action_sheet?.present();
    }
  }

  async update_number(event: any) {
    const regex = /^\d{10}$/;
    if (event.target.value != null && event.target.value.toString().trim() != "") {
      var text = event.target.value.toString().trim();

      if (regex.test(text)) {

        if (this.user != undefined) {
          this.user.phone = text;
          debugger
          this.session.update(this.user);
          await this.connection.updateDoc('users', this.user?.id.toString(), { phone: text });

          if (this.txt_phone && this.txt_whatsapp) {
            this.txt_phone.value = "";
            this.txt_whatsapp.value = "";

            this.txt_phone.placeholder = text;
            this.txt_whatsapp.placeholder = text;
          }

        }
      }
    }
  }
}
