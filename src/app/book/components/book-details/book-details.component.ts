import {ChangeDetectionStrategy, Component, OnDestroy} from '@angular/core';
import {Book} from '../../model/book';
import {ActivatedRoute, Router} from '@angular/router';
import {BookService} from '../../services/book.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';

@Component({
  selector: 'ba-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookDetailsComponent implements OnDestroy {
  readonly book: Book;
  readonly bookForm: FormGroup;

  private unsubscribe = new Subject();

  constructor(route: ActivatedRoute,
              private readonly router: Router,
              private readonly books: BookService) {
    this.bookForm = new FormGroup({
      author: new FormControl('',
        [Validators.required,
          Validators.maxLength(15),
          startsWith('John')]),
      title: new FormControl('', Validators.required)
    });
    this.book = route.snapshot.data.book as Book;
    if (this.book) {
      this.bookForm.patchValue(this.book);
    }
  }

  saveBook(): void {
    if (this.bookForm.valid) {
      const changedBook: Book = {
        id: this.book?.id,
        ...this.bookForm.value
      };

      this.books.saveOrUpdate(changedBook)
        .pipe(
          takeUntil(this.unsubscribe)
        )
        .subscribe(() => {
          this.router.navigateByUrl('/books');
        });
    }
  }

  getErrorMessagesOf(formControl: AbstractControl): string[] {
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

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}

function startsWith(testValue: string): ValidatorFn {
  // tslint:disable-next-line:only-arrow-functions
  return function(control: AbstractControl): ValidationErrors | null {
    const value = control?.value;
    if (value && !value.startsWith(testValue)) {
      return {
        startsWithMarek: false
      };
    }

    return null;
  };
}

