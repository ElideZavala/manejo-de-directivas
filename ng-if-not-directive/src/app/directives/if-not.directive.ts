import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appIfNot]'
})
export class IfNotDirective {

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef
  ) { }


  /*------- Establecemos el valor de visibility -------- */
  @Input() set appIfNot(value: boolean) {
    if (value === false) {
      /*------- Si es false, creara la vista ala que esta asignada -------- */
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    } else {
      /*------- Si es true, eliminara la vista -------- */
      this.viewContainerRef.clear();
    }
  }

}
