import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BookDetailsComponent} from './components/book-details/book-details.component';
import {BookOverviewComponent} from './components/book-overview/book-overview.component';
import {BookService} from './services/book.service';
import {BookResolver} from './components/book-details/book.resolver';
import {SharedModule} from '../shared/shared.module';
import { BookSearchComponent } from './components/book-overview/book-search/book-search.component';
import { BookResultsComponent } from './components/book-overview/book-results/book-results.component';

@NgModule({
  declarations: [BookDetailsComponent, BookOverviewComponent, BookSearchComponent, BookResultsComponent],
  imports: [
    SharedModule
  ],
  exports: [BookOverviewComponent]
})
export class BookModule {
  static forRoot(): ModuleWithProviders<BookModule> {
    return {
      ngModule: BookModule,
      providers: [BookService, BookResolver]
    };
  }
}
