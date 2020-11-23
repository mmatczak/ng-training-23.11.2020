import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookDetailsComponent } from './components/book-details/book-details.component';
import { BookOverviewComponent } from './components/book-overview/book-overview.component';

@NgModule({
  declarations: [BookDetailsComponent, BookOverviewComponent],
  imports: [
    CommonModule
  ],
  exports: [BookOverviewComponent]
})
export class BookModule { }
