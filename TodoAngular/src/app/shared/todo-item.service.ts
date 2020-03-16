import { Injectable } from '@angular/core';
import { TodoItem } from './todo-item.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TodoItemService {
  formData: TodoItem;
  readonly rootUrl = 'https://localhost:44385/api';
  list: TodoItem[];
  constructor(private http: HttpClient) { }

  postTodoItem() {
    return this.http.post(this.rootUrl + '/TodoItems', this.formData);
  }

  putTodoItem() {
    return this.http.put(this.rootUrl + '/TodoItems/' + this.formData.id, this.formData);
  }

  deleteTodoItem(id: number) {
    return this.http.delete(this.rootUrl + '/TodoItems/' + id);
  }

  refreshList() {
    this.http.get(this.rootUrl + '/TodoItems').
      toPromise().
      then(res => this.list = res as TodoItem[]);

    this.formData = {
      id: 0,
      name: null,
      isComplete: false
    };

  }

}
