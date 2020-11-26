import {Component, HostBinding, Input} from '@angular/core';
import {AbstractControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'ba-error-messages',
  templateUrl: './error-messages.component.html',
  styleUrls: ['./error-messages.component.scss']
})
export class ErrorMessagesComponent {
  // tslint:disable-next-line:no-input-rename
  @Input('of')
  set control(newControl: AbstractControl) {
    if (newControl) {
      this.errors$ = newControl.statusChanges
        .pipe(
          startWith(newControl.status),
          map(status => status === 'INVALID' ? getErrorMessagesOf(newControl) : [])
        );
    }
  }

  errors$: Observable<string[]>;

  @HostBinding('class.invalid-feedback')
  invalidFeedback = true;
}

function getErrorMessagesOf(formControl: AbstractControl): string[] {
  const errors = formControl?.errors;
  return errors ? Object.keys(errors).map(errorCode => {
    switch (errorCode) {
      case 'required':
        return 'Please provide a value';
      case 'maxlength':
        const errorMeta = errors[errorCode];
        return `The length exceeded ${errorMeta.requiredLength} characters (by ${errorMeta.actualLength - errorMeta.requiredLength} characters)`;
      default:
        return 'Unknown error occurred';
    }
  }) : [];
}
