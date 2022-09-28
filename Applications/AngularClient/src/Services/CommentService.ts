import { Injectable } from '@angular/core';
import { TaskMdl } from '../Models/TaskMdl';
import { BaseService } from './BaseService';

@Injectable({
  providedIn: 'root',
})
export class CommentService extends BaseService<TaskMdl> {


}
