import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { TaskMdl } from '../../Models/TaskMdl';
import { FormMode } from '../../Models/FormMode';
import { FormsModule } from '@angular/forms';
import { TaskStatusList } from '../../Models/TaskStatusList';
import { TaskTypeList } from '../../Models/TaskTypeList';
import { UserMdl } from '../../Models/UserMdl';
import { UserService } from '../../Services/UserService';
import { TaskEvent } from './TaskEvent';
import { TaskEventList } from './TaskEventList';

@Component({
  selector: 'task',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  formMode = FormMode;
  taskStatusList = TaskStatusList;
  taskTypeList = TaskTypeList;
  taskEventList = TaskEventList;
  @Input() Task?: TaskMdl = undefined;
  @Output() OnEvent = new EventEmitter<TaskEvent>();

  users: UserMdl[] = [];
  constructor(  private userService: UserService) {

  }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.userList.then(result => {
      this.users = result;
    })
   
  }

  MapUser(): void {
    if (!this.Task) return;
    var user = this.users.find(d => d.ID == this.Task?.AssignedTo);
    if (user) {
      this.Task.User = user;
    }
  }

  get Valid(): boolean {
    return (this.Task?.Description && this.Task?.AssignedTo) != undefined
  }

  Emit(event: TaskEvent): void {
    debugger
    event.Task.TaskStatus = Number(event.Task.TaskStatus);
    event.Task.TaskType = Number(event.Task.TaskType);
    this.OnEvent.emit(event);
  }
}
