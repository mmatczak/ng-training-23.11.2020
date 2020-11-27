import {Component} from '@angular/core';
import {Book} from '../../model/book';
import {BookService} from '../../services/book.service';
import {Observable} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {pluck, switchMap} from 'rxjs/operators';

@Component({
  selector: 'ba-book-overview',
  templateUrl: './book-overview.component.html',
  styleUrls: ['./book-overview.component.scss']
})
export class BookOverviewComponent {
  readonly books$: Observable<Book[]>;
  readonly query$: Observable<string>;

  constructor(private readonly books: BookService,
              private readonly route: ActivatedRoute,
              private readonly router: Router) {
    this.query$ = route.params.pipe(pluck('query'));
    this.books$ = this.query$.pipe(
      switchMap(query => this.books.search(query))
    );
  }

  goToDetails(book: Book): void {
    this.router.navigate(['/book', book.id]);
  }

  updateQueryUrlParam(newQuery: string): void {
    this.router.navigate([{query: newQuery}], {relativeTo: this.route});
  }
}
