import {Directive} from '@angular/core';
import {NgControl} from "@angular/forms";

@Directive({
  selector: '[appNumber]',
  host: {
    '(ngModelChange)': 'onInputChange($event)',
    '(keydown.backspace)': 'onInputChange($event.target.value, true)'
  }
})
export class NumberDirective {
  constructor(public model: NgControl) {
  }

  onInputChange(event, backspace) {
    if (event) {
      var newVal = event.replace(/\D/g, '');
      this.model.valueAccessor.writeValue(newVal);
    }
  }

}
