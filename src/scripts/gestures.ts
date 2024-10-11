import { ElementRef } from "@angular/core";
import { Gesture, GestureController, GestureDetail } from "@ionic/angular";

export class Gestures {

    element: ElementRef;
    gestureCtrl: GestureController;
    originalX?: number;
    originalY?: number;
    startX?: number;
    startY?: number;
    allow_deltaX?: boolean;
    allow_deltaY?: boolean;
    direction = 'center';
    screen_size = 0;


    constructor(element: ElementRef, gestureCtrl: GestureController, screen_size: number, allow_deltaX?: boolean, allow_deltaY?: boolean) {
        this.element = element;
        this.gestureCtrl = gestureCtrl;
        this.allow_deltaX = allow_deltaX;
        this.allow_deltaY = allow_deltaY;
        this.screen_size = screen_size;
    }

    initializeGesture() {

        if (this.element != undefined) {
            const gesture: Gesture = this.gestureCtrl.create({
                el: this.element.nativeElement,
                gestureName: 'drag',
                onStart: ev => this.onDragStart(ev),
                onMove: ev => this.onDragMove(ev),
                onEnd: ev =>  this.onDragEnd(ev)
            });

            gesture.enable();
        }
    }

    onDragStart(ev: GestureDetail) { };

    onDragMove(ev: GestureDetail) { };

    onDragEnd(ev: GestureDetail) { };


}