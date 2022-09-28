import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { TaskMdl } from '../../Models/TaskMdl';
import { TaskService } from '../../Services/TaskService';
import { TaskComponent } from '../Task/task.component'; 
import { UserService } from '../../Services/UserService';
import { UserMdl } from '../../Models/UserMdl';
import { FormMode } from '../../Models/FormMode';

@Component({
  selector: 'task-list',
  standalone: true,
  imports: [CommonModule, TaskComponent],
  templateUrl: './task.list.component.html',
  styleUrls: ['./task.list.component.css']
})
export class TaskListComponent implements OnInit {


  tasks: TaskMdl[] = [];
 
  constructor(private taskService: TaskService) {

  }

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    debugger
    this.tasks = this.taskService.List();
  }

  newTask(): void { 
    let task: TaskMdl = this.taskService.Default;
    this.tasks.push(task);
  }

  SaveTask(task: TaskMdl): void {
  
    task.Mode = FormMode.Read;
    
  }

}
