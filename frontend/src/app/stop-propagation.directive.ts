import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appStopPropagation]' // Nome della direttiva
})
export class StopPropagationDirective {
  // Ascolta vari eventi e blocca la propagazione
  @HostListener('pointerdown', ['$event'])
  @HostListener('mousedown', ['$event'])
  @HostListener('touchstart', ['$event'])
  onEvent(event: Event): void {
    event.stopPropagation(); // Ferma la propagazione dell'evento
  }
}
