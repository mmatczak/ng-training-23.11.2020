import {Component} from '@angular/core';
import {Book} from '../../model/book';
import {BookService} from '../../services/book.service';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'ba-book-overview',
  templateUrl: './book-overview.component.html',
  styleUrls: ['./book-overview.component.scss']
})
export class BookOverviewComponent {
  readonly books$: Observable<Book[]>;

  constructor(private readonly books: BookService,
              private readonly router: Router) {
    this.books$ = books.getAll();
  }

  goToDetails(book: Book): void {
    this.router.navigate(['/book', book.id]);
  }
}
