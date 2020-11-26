import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {AppHeaderComponent} from './dialogs/app-header/app-header.component';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [AppHeaderComponent],
  imports: [
    CommonModule, RouterModule
  ],
  exports: [CommonModule, RouterModule,
    AppHeaderComponent, ReactiveFormsModule]
})
export class SharedModule {
}
