import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { TaskMdl } from '../../Models/TaskMdl';
import { FormMode } from '../../Models/FormMode';
import { FormsModule } from '@angular/forms';
import { TaskStatusList } from '../../Models/TaskStatusList';
import { TaskTypeList } from '../../Models/TaskTypeList';
import { UserMdl } from '../../Models/UserMdl';
import { UserService } from '../../Services/UserService';

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

  @Input() Task?: TaskMdl = undefined;
  @Output() OnSave = new EventEmitter<TaskMdl>();

  users: UserMdl[] = [];
  constructor(  private userService: UserService) {

  }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.users = this.users.length ? this.users : this.userService.List();
  }

  MapUser(): void {
    if (!this.Task) return;
    var user = this.users.find(d => d.ID == this.Task?.AssignedTo);
    if (user) {
      this.Task.User = user;
    }
  }
}
