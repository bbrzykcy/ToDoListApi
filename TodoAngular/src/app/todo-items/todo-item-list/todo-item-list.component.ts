import { Component, OnInit } from '@angular/core';
import { TodoItemService } from 'src/app/shared/todo-item.service';
import { TodoItem } from 'src/app/shared/todo-item.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-todo-item-list',
  templateUrl: './todo-item-list.component.html',
  styleUrls: []
})
export class TodoItemListComponent implements OnInit {

  constructor(public service: TodoItemService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.service.refreshList();
  }

  populateForm(todoItem: TodoItem) {
    this.service.formData = Object.assign({}, todoItem);
  }

  onDelete(id) {
    if (confirm('Czy na pewno chcesz usunąć tę pozycję?')) {
      this.service.deleteTodoItem(id).subscribe(
        res => {
          this.toastr.error('Pomyślnie usunięto pozycję', 'Lista ToDo');
          this.service.refreshList();
        },
        err => {
          console.log(err);
        }
      );
    }
  }

  onComplete(todoItem: TodoItem) {
    this.service.formData = Object.assign({}, todoItem);
    // tslint:disable-next-line: triple-equals
    if (this.service.formData.isComplete == true) {
      this.service.formData.isComplete = false;
    } else {
      this.service.formData.isComplete = true;
    }
    this.service.putTodoItem().subscribe(
      res => {
        this.toastr.success('Pomyślnie zaktualizowano status pozycji', 'Lista ToDo');
        this.service.refreshList();
      },
      err => {
        console.log(err);
      }
    );
  }
}
