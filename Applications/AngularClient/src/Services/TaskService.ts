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

  public override Delete(id: string): void {
    this.temp = this.temp.filter(d => d.ID != id)
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
