import { Directive, ElementRef, Input, OnInit, Output, EventEmitter } from '@angular/core';

export interface ReadTimeConfig {
  wordsPerMinute: number;
}

@Directive({
  selector: '[appReadTime]'
})
export class ReadTimeDirective implements OnInit {

  /*---------- configuracion ----------*/
  @Input() configuration: ReadTimeConfig = {
    wordsPerMinute: 200
  }

  @Output() readTimeCalculated = new EventEmitter<string>();

  constructor(private el: ElementRef) { }

  ngOnInit() {

    /*---------- Text donde se aplicara la directiva -----------*/
    const text = this.el.nativeElement.textContent;
    const time = this.calculateReadTime(text);
    const timeStr = this.createTimeString(time);

    /*---------- Emitimos el valor -----------*/
    this.readTimeCalculated.emit(timeStr);
  }

  calculateReadTime(text: string) {

    /*---------- Dividimos el texto en palabras sin espacios y las contamos -----------*/
    const wordsCount = text.split(/\s+/g).length;

    /*---------- Palabras por minuto -----------*/
    const minutes = wordsCount / this.configuration.wordsPerMinute;

    /*---------- Redondeamos el valor -----------*/
    return Math.ceil(minutes);
  }

  /*---------- Lógica 😍 -----------*/
  createTimeString(timeInMinutes: number) {
    if (timeInMinutes === 1) {
      return '1 minuto';
    } else if (timeInMinutes > 1) {
      return '< 1 minute';
    } else {
      return `${timeInMinutes} minutes`;
    }
  }

}
