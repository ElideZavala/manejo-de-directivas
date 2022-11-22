import { Directive, Input, HostListener } from '@angular/core';

@Directive({
  selector: '[appScrollTo]'
})
export class ScrollToDirective {
  @Input() target = '';

  /*------- Detectamos el evento aignado en la directiva -------- */
  @HostListener('click')

  onClick() {
    /*------- Obtenemos la ubicación del id obtenido -------- */
    const targetElement = document.querySelector(this.target);

    /*------- Si existe el elemento, lo ubicamos en la pantalla -------- */
    targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  constructor() { }



}
