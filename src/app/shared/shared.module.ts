import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {AppHeaderComponent} from './dialogs/app-header/app-header.component';
import {ReactiveFormsModule} from '@angular/forms';
import {ErrorMessagesComponent} from './forms/error-messages/error-messages.component';
import {WithErrorsComponent} from './forms/with-errors/with-errors.component';

@NgModule({
  declarations: [AppHeaderComponent, ErrorMessagesComponent, WithErrorsComponent],
  imports: [
    CommonModule, RouterModule
  ],
  exports: [CommonModule, RouterModule, ReactiveFormsModule,
    AppHeaderComponent, ErrorMessagesComponent, WithErrorsComponent]
})
export class SharedModule {
}
