import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormMode } from '../Models/FormMode';
import { TaskMdl } from '../Models/TaskMdl';
import { TaskStatusList } from '../Models/TaskStatusList';
import { TaskTypeList } from '../Models/TaskTypeList';
import { BaseService } from './BaseService';

/**  Custom implamentation for Task api */
@Injectable({
  providedIn: 'root',
})
 export class TaskService extends BaseService<TaskMdl> {
  constructor(httpClient: HttpClient) {
    
    super(httpClient);
    this.EndPoint ="/task/api/Task"
  }

  /**  Default data for testing  */
  public get Default(): TaskMdl {   
    return {
     
      Mode: FormMode.Edit,
      TaskStatus: TaskStatusList.Active,
      TaskType: TaskTypeList.TaskTypeA
    }
  }

}
