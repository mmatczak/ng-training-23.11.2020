import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {Book} from '../../model/book';
import {BookService} from '../../services/book.service';
import {fromEvent, Observable, of, OperatorFunction} from 'rxjs';
import {debounceTime, distinctUntilChanged, map, switchMap} from 'rxjs/operators';

@Component({
  selector: 'ba-book-overview',
  templateUrl: './book-overview.component.html',
  styleUrls: ['./book-overview.component.scss']
})
export class BookOverviewComponent implements AfterViewInit{
  @ViewChild('searchInput')
  searchInput: ElementRef<HTMLInputElement>;

  books: Book[];
  readonly books$: Observable<Book[]>;

  results$: Observable<string[]>;

  selectedBook: Book | null = null;

  constructor(books: BookService) {
    this.books$ = books.getAll();
  }

  selectBook(book: Book): void {
    this.selectedBook = book;
  }

  isBookSelected(book: Book): boolean {
    return this.selectedBook === book;
  }

  updateBook(changedBook: Book): void {
    this.books = this.books.map(
      book => book.id === changedBook.id ? changedBook : book);
    this.selectedBook = changedBook;
  }

  ngAfterViewInit(): void {
    function search(query: string): Observable<string[]> {
      return of([query]);
    }

    this.results$ = fromEvent(this.searchInput.nativeElement, 'input')
      .pipe(
        mapFromInputEventToInputValue(),
        debounceTime(500),
        distinctUntilChanged(),
        switchMap(query => search(query))
      );
  }
}

function mapFromInputEventToInputValue(): OperatorFunction<Event, string> {
  return map(event => {
    const inputElement = event.target as HTMLInputElement;
    return inputElement.value;
  });
}
