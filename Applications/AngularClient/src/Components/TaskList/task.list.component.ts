import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskMdl } from '../../Models/TaskMdl';
import { TaskService } from '../../Services/TaskService';
import { TaskComponent } from '../Task/task.component';
import { FormMode } from '../../Models/FormMode';
import { ActivatedRoute, Params, Router, RouterModule } from '@angular/router';
import { TaskEvent } from '../Task/TaskEvent';
import { TaskEventList } from '../Task/TaskEventList';
import { CommandService } from '../../Services/CommandService';

@Component({
  selector: 'task-list',
  standalone: true,
  imports: [CommonModule, TaskComponent, RouterModule],
  templateUrl: './task.list.component.html',
  styleUrls: ['./task.list.component.css']
})
export class TaskListComponent implements OnInit {


  tasks: TaskMdl[] = [];

  constructor(private taskService: TaskService, private commandService: CommandService, private route: ActivatedRoute) {

  }

  ngOnInit(): void {

    this.loadTasks();
    this.registerCommands();
  }

  loadTasks(): void {
    //this.tasks = this.taskService.List();
    debugger
    this.taskService.List().subscribe(result => {
      this.tasks = result;
      this.tasks.forEach(d => d.Mode = FormMode.Read)
    })
  }

  newTask(): void {
    let task: TaskMdl = this.taskService.Default;
    this.tasks.push(task);
  }

  public OnTaskEvent(event: TaskEvent): void {
    let c: string = this.commandService.PREF_COMMAND;
    switch (event.Type) {
      case TaskEventList.Save:
        event.Task.Mode = FormMode.Read;

        this.commandService.SetComand({ c: '' })
        break;
      case TaskEventList.Edit:
        let id = this.commandService.PREF_ID;
        this.commandService.SetComand({ c: this.commandService.PREF_EDIT, id: event.Task.ID })
        break;
      case TaskEventList.Delete:
        if (confirm("Do you want to delete this task?")) {
          this.tasks = this.tasks.filter(d => d.ID != event.Task.ID);
        }
        break;
      default:
    }
  }

  registerCommands(): void {

    this.route.queryParams.subscribe(params => {
      debugger
      switch (params[this.commandService.PREF_COMMAND]) {
        case this.commandService.PREF_NEW:
          this.newTask();
          break;
        case this.commandService.PREF_EDIT:
          let task = this.tasks.find(d => d.ID == params[this.commandService.PREF_ID]);
          if (task != null) task.Mode = FormMode.Edit;
          break;
        default:
      }
    })
  }

}
