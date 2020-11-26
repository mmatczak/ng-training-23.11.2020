import {AfterContentInit, Component, ContentChild} from '@angular/core';
import {AbstractControl, FormControlDirective, FormControlName} from '@angular/forms';

@Component({
  selector: 'ba-with-errors',
  templateUrl: './with-errors.component.html',
  styleUrls: ['./with-errors.component.scss']
})
export class WithErrorsComponent implements AfterContentInit {
  @ContentChild(FormControlName)
  formControlName: FormControlName;

  @ContentChild(FormControlDirective)
  formControlDirective: FormControlDirective;

  control: AbstractControl;

  ngAfterContentInit(): void {
    this.control = this.formControlName.control || this.formControlDirective.control;
  }
}
