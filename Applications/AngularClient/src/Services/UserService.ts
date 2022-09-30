import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core'; 
import { UserMdl } from '../Models/UserMdl';
import { BaseService } from './BaseService';

/**  Custom implamentation for User api */
@Injectable({
  providedIn: 'root',
})
export class UserService extends BaseService<UserMdl> {

  /**  single promise for all request to prevent multiple api calls */
  public userList: Promise<UserMdl[]>;


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
