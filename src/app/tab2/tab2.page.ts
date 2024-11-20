import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { TabsPage } from '../tabs/tabs.page';
import { ActivatedRoute, Router } from '@angular/router';
import { IUser } from 'src/interfaces/iuser';
import { GestureController, ToastController } from '@ionic/angular';
import { Gestures } from 'src/scripts/gestures';
import { CardGesture } from 'src/scripts/card-gestures';
import { Geolocations } from 'src/scripts/geolocation';
import { Datum } from 'src/interfaces/meetings';
import { Utils } from 'src/scripts/utils';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

export class Tab2Page extends TabsPage {
  // Referencias a elementos DOM con @ViewChild
  @ViewChild('recent_card', { static: false }) recent_card?: ElementRef;
  @ViewChild('status_card', { static: false }) status_card?: ElementRef;
  @ViewChild('card_buttons', { static: false }) card_buttons?: ElementRef;
  @ViewChild('yes', { static: false }) yes_element?: ElementRef;
  @ViewChild('no', { static: false }) no_element?: ElementRef;

  gestures?: Gestures;
  recent_photo: String = "";
  recent_full_name?: string;
  recent_user?: IUser;
  back_style?: string = '';
  recent_id?: String;
  all_meetings_recollected: Array<any> = [];

  constructor(
    toastController: ToastController,
    router: Router,
    geolocation: Geolocations,
    private route: ActivatedRoute,
    private gestureCtrl: GestureController
  ) {
    super(toastController, router, geolocation);
  }

  // Método que se ejecuta cuando se inicializa el componente
  override async ngOnInit() {
    const is_nearby = await this.initializeRecentUser();

    if (this.recent_card && this.status_card && this.yes_element && this.no_element && this.card_buttons) {
      this.gestures = new CardGesture(
        this,
        this.card_buttons,
        this.recent_card,
        this.status_card,
        this.gestureCtrl,
        this.yes_element,
        this.no_element,
        window.innerWidth,
        true,
        false,
        this.recent_id?.toString() ?? ''
      );

      this.gestures?.initializeGesture();
    }

    this.recent_card?.nativeElement.addEventListener('touchmove', (e: TouchEvent) => e.preventDefault());  // Previene el comportamiento de pull-to-refresh
  }

  // Método que inicializa el usuario reciente y los datos asociados
  private async initializeRecentUser(): Promise<boolean> {
    let is_nearby = false;
    let id: string | undefined;

    if (this.user) {
      id = this.route.snapshot.paramMap.get('recent_id')?.toString() ?? await this.getNearbyUserId();
      this.recent_id = id;

      if (id) {
        this.recent_user = await this.usr?.get_recents(id) as IUser;

        if (this.recent_user) {
          this.recent_full_name = `${this.recent_user.first_name} ${this.recent_user.last_name}`;
          this.recent_photo = Utils.getBase64Url(this.recent_user.photo);

          if (await this.handleNearbyMeetings(id)) {
            is_nearby = true;
          }
        }
      }
    }

    return is_nearby;
  }

  // Método para obtener el ID del usuario cercano
  private async getNearbyUserId(): Promise<string> {

    if (this.user) {
      this.user_meet = await this.geolocation?.sendLocation(this.user);
      return this.user_meet?.nearbyDevices[0].id ?? '';
    }
    return '';
  }

  // Maneja el registro de encuentros si el usuario está cerca
  private async handleNearbyMeetings(id: string): Promise<boolean> {
    let is_nearby = false;

    if (this.usr && this.user)
      if (this.recent_user) {
        const new_meet: Datum = {
          creation_date: Date.now().toString(),
          percentage: 100, // TODO: Calcular el porcentaje de paridad entre usuarios
          id_user: id,
          latitude: this.recent_user.latitude ?? 0,
          longitude: this.recent_user.longitude ?? 0
        };

        const { all_meetings, meetings } = await this.usr.get_meetings();
        this.all_meetings_recollected = all_meetings;

        if (!meetings || meetings.data.length === 0) {
          this.all_meetings_recollected.push(new_meet);
        } else if (!meetings.data.find(x => x.id_user === new_meet.id_user)) {
          meetings.data.push(new_meet);
          this.all_meetings_recollected.push(meetings.data);
        }

        this.connection.setDoc('meetings', this.user.id.toString(), {
          id: this.user.id.toString(),
          data: this.all_meetings_recollected,
        });

        is_nearby = true;
      }

    return is_nearby;
  }

  // Método para aceptar una solicitud de amistad
  async accept(recent_id?: string) {
    if (this.user && this.usr) {
      this.usr.session = this.session;
      const idToAccept = recent_id ?? this.recent_id ?? "";
      this.usr.accept_friend(idToAccept.toString());
    }
  }

  // Método para finalizar la interacción con la tarjeta
  finish() {
    this.status_card?.nativeElement.remove();
  }

  // Manejo de eventos de toque
  @HostListener('touchmove', ['$event'])
  onTouchMove(event: TouchEvent) {
    event.preventDefault();  // Previene el movimiento de la pantalla
  }

  @HostListener('touchstart', ['$event'])
  onTouchStart(event: TouchEvent) {
    document.body.style.overflow = 'hidden';  // Desactiva el desplazamiento durante el toque
  }

  @HostListener('touchend', ['$event'])
  onTouchEnd(event: TouchEvent) {
    document.body.style.overflow = '';  // Vuelve a habilitar el desplazamiento
  }
}
