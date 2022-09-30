import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { KeyValue } from '../Models/KeyValue';
import { UserMdl } from '../Models/UserMdl';
import { BaseService } from './BaseService';

@Injectable({
  providedIn: 'root',
})
export class UserService extends BaseService<UserMdl> {
  public userList: Promise<UserMdl[]> ;
  constructor(httpClient: HttpClient) {
    super(httpClient);
    this.EndPoint = "/task/api/User"
    this.userList = new Promise<UserMdl[]>(resolve => {
      super.List().subscribe(data => {
  
        resolve(data);
      });
    }); 
  } 
  
 
}
