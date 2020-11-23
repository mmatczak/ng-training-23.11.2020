import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookDetailsComponent } from './components/book-details/book-details.component';

@NgModule({
  declarations: [BookDetailsComponent],
  imports: [
    CommonModule
  ],
  exports: [BookDetailsComponent]
})
export class BookModule { }
