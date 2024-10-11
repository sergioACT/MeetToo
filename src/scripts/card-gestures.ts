import { ElementRef } from "@angular/core";
import { Gestures } from "./gestures";
import { Gesture, GestureController, GestureDetail } from "@ionic/angular";
import { arrayRemove } from "firebase/firestore";
import { Tab2Page } from "src/app/tab2/tab2.page";

export class CardGesture extends Gestures {

    status_card: ElementRef;
    yes_element: ElementRef;
    no_element: ElementRef;
    card_buttons: ElementRef;

    constructor(private tabPage: Tab2Page,card_buttons: ElementRef, element: ElementRef, status_card: ElementRef, gestureCtrl: GestureController, yes_element: ElementRef, no_element: ElementRef, screen_size: number, allow_deltaX?: boolean, allow_deltaY?: boolean) {
        super(element, gestureCtrl, screen_size, allow_deltaX, allow_deltaY);
        this.status_card = status_card;
        this.yes_element = yes_element;
        this.no_element = no_element;
        this.card_buttons = card_buttons;
    }

    override onDragStart(ev: GestureDetail) {
        const el = this.element?.nativeElement;

        // Obtener las coordenadas iniciales
        this.originalX = el.offsetLeft;
        this.originalY = el.offsetTop;

        // Guardar la posición inicial del gesto
        this.startX = ev.startX;
        this.startY = ev.startY;

    }

    override onDragMove(ev: GestureDetail) {
        const el = this.element;
        // Calcular la nueva posición del componente
        let is_right = ev.deltaX > 0;

        var limit_right = this.screen_size / 3;
        var limit_left = (limit_right * -1) * 2;

        // Calcular la nueva posición del componente
        var deltaX = this.allow_deltaX ? ev.deltaX : 0;

        const coords = el.nativeElement.getBoundingClientRect();

        let deg = deltaX / 10;

        let opcaity = deltaX * 0.01;

        if (is_right) {
            // if (coords.left <= limit_right)
            el.nativeElement.style.transform = `translateX(${deltaX}px) rotate(${deg}deg)`;
            this.yes_element.nativeElement.style.opacity = opcaity;
            console.log("opacity", opcaity);

        }


        if (!is_right) {
            // if (coords.left >= limit_left)
            el.nativeElement.style.transform = `translateX(${deltaX}px) rotate(${deg}deg)`;
            this.no_element.nativeElement.style.opacity = opcaity * -1;
            console.log("opacity", opcaity);

        }

    }

    override async onDragEnd(ev: GestureDetail) {

        const el = this.element?.nativeElement;

        // Animación de retorno
        el.style.transition = 'transform 0.3s ease-out';
        console.log(`finX: ${el.offsetLeft}, finY: ${el.offsetTop}`);

        const coords = el.getBoundingClientRect();
        var transform = ``;

        var limit_right = this.screen_size / 2;
        var limit_left = this.screen_size * -1;

        if (coords.left > limit_right) {
            console.log('entro en el limite')

            setTimeout(() => {
            }, 500);
            transform = `translateX(200%) rotate(${24}deg)`;
            (this.element.nativeElement as HTMLElement).classList.add('select-card');
            (this.status_card.nativeElement as HTMLElement).classList.add('status-card');
            (this.card_buttons.nativeElement as HTMLElement).style.display = 'none';
            await this.tabPage.accept();

        }
        else if ((coords.left) < limit_left) {
            console.log('entro en el limite')

            setTimeout(() => {
            }, 500);
            transform = `translateX(-200%) rotate(${-24}deg)`;
            (this.element.nativeElement as HTMLElement).classList.add('select-card');
            (this.status_card.nativeElement as HTMLElement).classList.add('status-card');
            (this.card_buttons.nativeElement as HTMLElement).style.display = 'none';
        }
        else {
            this.yes_element.nativeElement.style.opacity = 0;
            this.no_element.nativeElement.style.opacity = 0;

            transform = `translate3d(0, 0, 0)`;
        }

        el.style.transform = transform;

        // Limpiar estilos de transición después de la animación
        setTimeout(() => {
            el.style.transition = '';
        }, 300);
    }

}