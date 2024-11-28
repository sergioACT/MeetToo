import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonAlert, IonPopover } from '@ionic/angular';

@Component({
  selector: 'app-header-icon',
  templateUrl: './header-icon.component.html',
  styleUrls: ['./header-icon.component.scss'],
})
export class HeaderIconComponent implements OnInit {
  @Input() name: string | undefined;
  @Input() content: string | undefined;
  @Input() type: string | undefined;
  @Output() itemSelected = new EventEmitter<void>();

  is_open_selector?: boolean;


  @ViewChild('pop_over') pop_over?: IonPopover;
  @ViewChild('alert') _alert?: IonAlert;

  public alertButtons = [
    {
      text: 'OK',
      role: 'confirm',
      handler: () => {
        this.log_out(); // Llamar al método desde aquí
      }
    },
    {
      text: 'Cancel',
      role: 'cancel',
      handler: () => {
      },
    },
  ];
  constructor(private router: Router) { }

  ngOnInit() { }

  click(event: any) {

    switch (this.type) {
      case "ellipsis":
        this.selector(event);
        break;
      case "power":
        this.alert(event);
        break;
    }
  }

  alert(event: any) {
    this._alert?.present();
  }

  selector(event: any) {
    if (!this.is_open_selector) {
      const icon = event as HTMLIonIconElement;
      icon.name = "close";
      if (this.pop_over)
        this.pop_over.event = event;
      this.pop_over?.present();
    }
    else {
      this.itemSelected.emit();
      this.is_open_selector = false;

    } // Emitir el evento cuando se selecciona el ítem

  }

  select() {
    this.itemSelected.emit(); // Emitir el evento cuando se selecciona el ítem
    this.is_open_selector = true;
  }

  log_out() {
    sessionStorage.removeItem('log_user');
    this.router.navigate(['/register']);
  }
}
