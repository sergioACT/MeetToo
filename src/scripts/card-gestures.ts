import { ElementRef } from "@angular/core";
import { Gestures } from "./gestures";
import { Gesture, GestureController, GestureDetail } from "@ionic/angular";
import { arrayRemove } from "firebase/firestore";

export class CardGesture extends Gestures {

    content: ElementRef;
    status_card: ElementRef;


    constructor(content: ElementRef, element: ElementRef, status_card: ElementRef, gestureCtrl: GestureController, screen_size: number, allow_deltaX?: boolean, allow_deltaY?: boolean) {
        super(element, gestureCtrl, screen_size, allow_deltaX, allow_deltaY);
        this.content = content;
        this.status_card = status_card;
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

        if (is_right) {
            // if (coords.left <= limit_right)
            el.nativeElement.style.transform = `translateX(${deltaX}px) rotate(${deg}deg)`;
            this.content?.nativeElement.classList.remove('red-card');
            this.content?.nativeElement.classList.add('green-card');
        }


        if (!is_right) {
            // if (coords.left >= limit_left)
            el.nativeElement.style.transform = `translateX(${deltaX}px) rotate(${deg}deg)`;
            this.content?.nativeElement.classList.remove('green-card');
            this.content?.nativeElement.classList.add('red-card');
        }

    }

    override onDragEnd(ev: GestureDetail) {

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
            transform = `translateX(100%) rotate (${24}deg)`;
            // (this.element.nativeElement as HTMLElement).classList.add('select-card');
            // (this.status_card.nativeElement as HTMLElement).classList.add('status-card');

        }
        else if ((coords.left) < limit_left) {
            console.log('entro en el limite')

            setTimeout(() => {
            }, 500);
            transform = `translateX(-100%) rotate (${-24}deg)`;
            // (this.element.nativeElement as HTMLElement).classList.add('select-card');
            // (this.status_card.nativeElement as HTMLElement).classList.add('status-card');
        }
        else
            transform = `translate3d(0, 0, 0)`;
        console.log('esquina izquierda', coords.left)

        console.log('ezquina derecha', coords.left + el.innerWidth)

        console.log('limite izq', limit_left)
        console.log('limite der', limit_right)


        el.style.transform = transform;

        // Limpiar estilos de transición después de la animación
        setTimeout(() => {
            el.style.transition = '';
        }, 300);
    }

}