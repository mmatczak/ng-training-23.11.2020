import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BookModule} from './book/book.module';
import {RouterModule} from '@angular/router';
import {BookOverviewComponent} from './book/components/book-overview/book-overview.component';
import {BookDetailsComponent} from './book/components/book-details/book-details.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BookModule.forRoot(),
    RouterModule.forRoot([
      {path: '', redirectTo: '/books', pathMatch: 'full'},
      {
        path: 'books',
        component: BookOverviewComponent
      },
      {
        path: 'book/:bookId',
        component: BookDetailsComponent
      }
    ])
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
