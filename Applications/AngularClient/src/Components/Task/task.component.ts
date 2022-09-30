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
import { RouterModule } from '@angular/router';

@Component({
  selector: 'task',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  /**  Display type of data*/
  formMode = FormMode;

  taskStatusList = TaskStatusList;
  taskTypeList = TaskTypeList;
  taskEventList = TaskEventList;

  /** Context data */
  @Input() Task?: TaskMdl = undefined;

  /** Pass commands to parent */
  @Output() OnEvent = new EventEmitter<TaskEvent>();

  /**  user list to link task */
  users: UserMdl[] = [];
  constructor(  private userService: UserService) {

  }

  ngOnInit(): void {
    this.loadUsers();
    if (this.Task?.RequiredByDate) {
      this.Task.RequiredByDateStr = this.Task?.RequiredByDate.toString().split("T")[0];  
    }
  }

  /** Load users */
  loadUsers(): void {
    this.userService.userList.then(result => {
      this.users = result;
    })
   
  }

  /**  User entity to related task mapping */
  MapUser(): void {
    if (!this.Task) return;
    
    var user = this.users.find(d => d.ID == this.Task?.AssignedTo);
    if (user) {
      this.Task.User = user;
    }
  }

  /**  simple form validation   */
  get Valid(): boolean {
    return (this.Task?.Description && this.Task?.AssignedTo) != undefined
  }

  /**  Clean up data before pass */
  Emit(event: TaskEvent): void {
     
    if (event.Task.RequiredByDateStr) {
      event.Task.RequiredByDate = new Date(event.Task.RequiredByDateStr);
    }
    event.Task.TaskStatus = Number(event.Task.TaskStatus);
    event.Task.TaskType = Number(event.Task.TaskType);
    this.OnEvent.emit(event);
  }
}
