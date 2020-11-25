import {BehaviorSubject, Observable} from 'rxjs';
import {Book} from '../model/book';
import {delay} from 'rxjs/operators';

export class BookService {
  private idSeq = 0;

  private booksSubject = new BehaviorSubject<Book[]>([
    {
      id: this.idSeq++,
      author: 'Marek Matczak',
      title: 'Angular for nerds'
    },
    {
      id: this.idSeq++,
      author: 'Douglas Crockford',
      title: 'JavaScript. The good parts'
    },
    {
      id: this.idSeq++,
      author: 'John Example',
      title: 'Angular for dummies'
    }
  ]);

  getAll(): Observable<Book[]> {
    return this.booksSubject.asObservable().pipe(delay(2000));
  }

  saveOrUpdate(bookToUpdate: Book): Observable<Book> {
    return new Observable<Book>(subscriber => {
      const currentBooks = this.booksSubject.value;
      let book;
      let newBooks;
      if (bookToUpdate.id != null) {
        book = {...bookToUpdate};
        newBooks = currentBooks.map(
          currentBook => currentBook.id === book.id ? book : currentBook);
      } else {
        book = {...bookToUpdate, id: this.idSeq++};
        newBooks = [...currentBooks, book];
      }
      this.booksSubject.next(newBooks);
      subscriber.next(book);
      subscriber.complete();
    });
  }

  getOne(bookId: number): Observable<Book> {
    return new Observable<Book>(subscriber => {
      const currentBooks = this.booksSubject.value;
      const foundBook = currentBooks.find(book => book.id === bookId);
      if (foundBook) {
        subscriber.next(foundBook);
        subscriber.complete();
      } else {
        subscriber.error(new Error(`Book with id ${bookId} could not be found`));
      }
    }).pipe(delay(2000));
  }
}
