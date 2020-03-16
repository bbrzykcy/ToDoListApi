import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { TodoItemComponent } from './todo-items/todo-item/todo-item.component';
import { TodoItemsComponent } from './todo-items/todo-items.component';
import { TodoItemListComponent } from './todo-items/todo-item-list/todo-item-list.component';
import { TodoItemService } from './shared/todo-item.service';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    TodoItemComponent,
    TodoItemsComponent,
    TodoItemListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [TodoItemService],
  bootstrap: [AppComponent]
})
export class AppModule { }
