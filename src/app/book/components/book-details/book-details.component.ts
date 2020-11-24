import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {Book} from '../../model/book';

@Component({
  selector: 'ba-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookDetailsComponent {
  @Input()
  book: Book;

  @Output()
  bookChange = new EventEmitter<Book>();

  notifyOnBookChange(event: Event): void {
    event.preventDefault();

    const formElement = event.target as HTMLFormElement;
    const authorInput = formElement.querySelector<HTMLInputElement>('#author');
    const titleInput = formElement.querySelector<HTMLInputElement>('#title');

    const changedBook: Book = {
      id: this.book.id,
      author: authorInput.value,
      title: titleInput.value
    };
    this.bookChange.emit(changedBook);
  }
}
