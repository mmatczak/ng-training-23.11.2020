import {BehaviorSubject, Observable, of, Subject} from 'rxjs';
import {Book} from '../model/book';
import {OnDestroy} from '@angular/core';

export class BookService {
  private booksSubject = new BehaviorSubject<Book[]>([
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
  ]);

  getAll(): Observable<Book[]> {
    return this.booksSubject.asObservable();
  }

  update(bookToUpdate: Book): Observable<Book> {
    return new Observable<Book>(subscriber => {
      const copy = {...bookToUpdate};
      const currentBooks = this.booksSubject.value;
      const newBooks = currentBooks.map(
        book => book.id === copy.id ? copy : book);
      this.booksSubject.next(newBooks);
      subscriber.next(copy);
      subscriber.complete();
    });
  }
}
