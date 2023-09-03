import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/models/task';
import { CrudService } from 'src/app/services/crud.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  taskObj : Task = new Task();
  taskArr : Task[] = [];
  addTaskValue : string = '';
  editTaskValue : string = '';

  constructor(private crudService : CrudService) {}

  ngOnInit(): void {
    this.editTaskValue = '';
    this.addTaskValue = '';
    this.taskObj = new Task();
    this.taskArr = [];
    this.getAllTask();    
  }

  getAllTask() {
    this.crudService.getAllTask().subscribe((res) => {
      this.taskArr = res;      
    }, (error) => {
      alert('Unable to get list of tasks!');
    })
  }

  addTask() {
    this.taskObj.task_name = this.addTaskValue;
    this.crudService.addTask(this.taskObj).subscribe((res) => {
      this.ngOnInit();
      this.addTaskValue = '';
    }, (error) => {
      alert(error);
    })
  }

  call(task : Task) {
    this.taskObj = task;
    this.editTaskValue = task.task_name;
  }

  editTask() {
    this.taskObj.task_name = this.editTaskValue;
    this.crudService.editTask(this.taskObj).subscribe((res) => {
      this.ngOnInit();
    }, (error) => {
      alert('Failed to update task');
    })
  }

  deleteTask(task : Task) {
    this.crudService.deleteTask(task).subscribe((res) => {
      this.ngOnInit();
    }, (error) => {
      alert('Failed to delete task')
    })
  }
}
