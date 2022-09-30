import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommentMdl } from '../Models/CommentMdl'; 
import { BaseService } from './BaseService';

@Injectable({
  providedIn: 'root',
})
export class CommentService extends BaseService<CommentMdl> {
  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

}
