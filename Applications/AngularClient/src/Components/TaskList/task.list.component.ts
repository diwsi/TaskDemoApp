import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { TaskMdl } from '../../Models/TaskMdl';
import { TaskService } from '../../Services/TaskService';
import { TaskComponent } from '../Task/task.component';  
import { FormMode } from '../../Models/FormMode';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'task-list',
  standalone: true,
  imports: [CommonModule, TaskComponent, RouterModule],
  templateUrl: './task.list.component.html',
  styleUrls: ['./task.list.component.css']
})
export class TaskListComponent implements OnInit {


  tasks: TaskMdl[] = [];

  constructor(private taskService: TaskService, private route: ActivatedRoute) {

  }

  ngOnInit(): void {
     
    this.loadTasks();
    this.registerRoutes();
  }

  loadTasks(): void {    
    this.tasks = this.taskService.List();
  }

  newTask(): void { 
    let task: TaskMdl = this.taskService.Default;
    this.tasks.push(task);
  }

  public SaveTask(task: TaskMdl): void {
  
    task.Mode = FormMode.Read;
    
  }

  registerRoutes(): void {
    this.route.queryParams.subscribe(params => {

      switch (params['c']) {
        case 'new':
          this.newTask();
          break;
        default:
      }
    })
  }

}
