import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {Book} from '../../model/book';
import {ActivatedRoute} from '@angular/router';
import {BookService} from '../../services/book.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'ba-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookDetailsComponent {
  book$: Observable<Book>;

  @Output()
  bookChange = new EventEmitter<Book>();

  constructor(route: ActivatedRoute, books: BookService) {
    const bookIdAsString = route.snapshot.paramMap.get('bookId');
    if (bookIdAsString) {
      const bookId = +bookIdAsString;
      if (!isNaN(bookId)) {
        this.book$ = books.getOne(bookId);
      }
    }
  }

  notifyOnBookChange(event: Event): void {
    event.preventDefault();

    const formElement = event.target as HTMLFormElement;
    const authorInput = formElement.querySelector<HTMLInputElement>('#author');
    const titleInput = formElement.querySelector<HTMLInputElement>('#title');

    const changedBook: Book = {
      // id: this.book.id,
      id: 0,
      author: authorInput.value,
      title: titleInput.value
    };
    this.bookChange.emit(changedBook);
  }
}
