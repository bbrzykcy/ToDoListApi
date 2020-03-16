import { Component, OnInit } from '@angular/core';
import { TodoItemService } from 'src/app/shared/todo-item.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: []
})
export class TodoItemComponent implements OnInit {

  constructor(public service: TodoItemService, public toastr: ToastrService) {

  }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    // tslint:disable-next-line: triple-equals
    if (this.service.formData.id == 0) {
      this.insertRecord(form);
    } else {
      this.updateRecord(form);
    }
  }

  insertRecord(form: NgForm) {
    this.service.postTodoItem().subscribe(
      res => {
        this.toastr.success('Pomyślnie dodano pozycje do listy', 'Lista ToDo');
        this.service.refreshList();
      },
      err => {
        console.log(err);
      }
    );
  }

  updateRecord(form: NgForm) {
    this.service.putTodoItem().subscribe(
      res => {
        this.toastr.info('Pomyślnie zmodyfikowano pozycję', 'Lista ToDo');
        this.service.refreshList();
      },
      err => {
        console.log(err);
      }
    );
  }

}
