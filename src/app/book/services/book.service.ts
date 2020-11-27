import {Observable} from 'rxjs';
import {Book} from '../model/book';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable()
export class BookService {
  constructor(private readonly http: HttpClient) {
  }

  getAll(): Observable<Book[]> {
    return this.http.get<Book[]>('api/books');
  }

  search(query: string): Observable<Book[]> {
    const params = new HttpParams().append('q', query || '');
    return this.http.get<Book[]>('api/books', {params});
  }

  saveOrUpdate(bookToUpdate: Book): Observable<Book> {
    return bookToUpdate.id != null ?
      this.http.put<Book>(`api/books/${bookToUpdate.id}`, bookToUpdate)
      : this.http.post<Book>('api/books', bookToUpdate);
  }

  getOne(bookId: number): Observable<Book> {
    return this.http.get<Book>(`api/books/${bookId}`);
  }
}
