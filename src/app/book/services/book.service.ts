import {Observable, of} from 'rxjs';
import {Book} from '../model/book';

export class BookService {
  private readonly books = [
    {
      id: 0,
      author: 'Marek Matczak',
      title: 'Angular for nerds'
    },
    {
      id: 1,
      author: 'Douglas Crockford',
      title: 'JavaScript. The good parts'
    },
    {
      id: 2,
      author: 'John Example',
      title: 'Angular for dummies'
    }
  ];

  getAll(): Observable<Book[]> {
    return of(this.books);
  }
}
