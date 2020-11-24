import {Book} from '../../model/book';
import {Observable} from 'rxjs';
import {BookDetailsComponent} from './book-details.component';
import {fromPromise} from 'rxjs/internal-compatibility';

class BookService {
  getOne(id: number): Observable<Book> {
    // 2.
    return new Observable<Book>(subscriber => {
      if (id < 0) {
        subscriber.error('id is less than 0');
      } else {
        setTimeout(() => {
          // 3.
          subscriber.next({
            id, author: 'Marek', title: 'Angular'
          });
          subscriber.complete();
        }, 1000);
      }
    });
    // return new Promise((resolve, reject) => {
    //   if (id < 0) {
    //     reject('id is less than 0');
    //   } else {
    //     setTimeout(() => {
    //       // 3.
    //       resolve({
    //         id, author: 'Marek', title: 'Angular'
    //       });
    //     }, 1000);
    //   }
    // });
  }

  getAll(): Observable<Book[]> {
    return fromPromise(fetch('http://my-server.com/books')
      .then(response => response.json()));
  }
}

const books = new BookService();

function printBookToConsole(book: Book): void {
  // 4.
  console.log(book);
}

const allBooks$: Observable<Book[]> = books.getAll();
const subscription = allBooks$.subscribe(
  allBooks => console.log(allBooks),
  error => console.error(error),
  () => console.log('Done'),
);


setTimeout(() => {
  subscription.unsubscribe();
}, 1000);


// 1.
// books.getOne(1, printBookToConsole);
books.getOne(-1)
  .subscribe(
    printBookToConsole,
    error => console.error(error)
  );

const component = new BookDetailsComponent();
component.bookChange
  .subscribe(changedBook => console.log(changedBook));


describe('My first tests', () => {
  it('checks if true is really true', (done) => {
    setTimeout(() => {
      expect(true).toBeTruthy();
      console.log('Expect');
      done();
    }, 1000);
    console.log('End');
  });
});
