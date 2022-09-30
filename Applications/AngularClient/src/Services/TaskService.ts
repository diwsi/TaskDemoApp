import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormMode } from '../Models/FormMode';
import { TaskMdl } from '../Models/TaskMdl';
import { TaskStatusList } from '../Models/TaskStatusList';
import { TaskTypeList } from '../Models/TaskTypeList';
import { BaseService } from './BaseService';

@Injectable({
  providedIn: 'root',
})
 export class TaskService extends BaseService<TaskMdl> {
  constructor(httpClient: HttpClient) {
    debugger
    super(httpClient);
    this.EndPoint ="/task/api/Task"
  }
 

   
   
  public get Default(): TaskMdl {
    let ID: string = (Math.random())+"";     
    return {
      ID: ID,
      Mode: FormMode.Edit,
      TaskStatus: TaskStatusList.Active,
      TaskType: TaskTypeList.TaskTypeA
    }
  }

}
