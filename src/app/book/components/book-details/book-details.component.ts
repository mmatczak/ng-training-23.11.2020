import {ChangeDetectionStrategy, Component, OnDestroy} from '@angular/core';
import {Book} from '../../model/book';
import {ActivatedRoute, Router} from '@angular/router';
import {BookService} from '../../services/book.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'ba-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookDetailsComponent implements OnDestroy {
  readonly book: Book;

  private unsubscribe = new Subject();

  constructor(route: ActivatedRoute,
              private readonly router: Router,
              private readonly books: BookService) {
    this.book = route.snapshot.data.book as Book;
  }

  saveBook(event: Event): void {
    event.preventDefault();

    const formElement = event.target as HTMLFormElement;
    const authorInput = formElement.querySelector<HTMLInputElement>('#author');
    const titleInput = formElement.querySelector<HTMLInputElement>('#title');

    const changedBook: Book = {
      id: this.book?.id,
      author: authorInput.value,
      title: titleInput.value
    };

    this.books.saveOrUpdate(changedBook)
      .pipe(
        takeUntil(this.unsubscribe)
      )
      .subscribe(() => {
        this.router.navigateByUrl('/books');
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
