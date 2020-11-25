import {ActivatedRouteSnapshot, Resolve, Router} from '@angular/router';
import {Book} from '../../model/book';
import {Observable, of, throwError} from 'rxjs';
import {BookService} from '../../services/book.service';
import {Injectable} from '@angular/core';
import {catchError} from 'rxjs/operators';

@Injectable()
export class BookResolver implements Resolve<Book> {

  constructor(private readonly books: BookService,
              private readonly router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<Book> {
    const bookIdAsString = route.paramMap.get('bookId');
    if (bookIdAsString) {
      const bookId = +bookIdAsString;
      if (!isNaN(bookId)) {
        return this.books.getOne(bookId)
          .pipe(
            catchError(error => {
              setTimeout(() => this.router.navigateByUrl('/book'));
              return throwError(error);
            })
          );
      }
    }
    setTimeout(() => this.router.navigateByUrl('/book'));
    return throwError(`${bookIdAsString} is not a correct value`);
  }
}
