import { Directive, Input, OnChanges, SimpleChanges, ElementRef } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})

export class HighlightDirective implements OnChanges {
  @Input() highlightText = '';
  @Input() highlightColor = 'yellow';
  originalHTML = '';

  constructor(private el: ElementRef) { }

  ngOnChanges(changes: SimpleChanges): void {

    if (changes.highlightText.firstChange) {
      this.originalHTML = this.el.nativeElement.innerHTML;
      return;
    }

    // extraemos el currentValue de la propiedad highlightText
    const { currentValue } = changes.highlightText;

    if (currentValue) {
      const regExp = new RegExp(`(${currentValue})`, 'gi');

      this.el.nativeElement.innerHTML = this.originalHTML.replace
        (regExp, `<span style="background-color: ${this.highlightColor}">\$1</span>`);

    } else {
      this.el.nativeElement.innerHTML = this.originalHTML;
    }
  }
}
