import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserMdl } from '../Models/UserMdl';
import { BaseService } from './BaseService';

@Injectable({
  providedIn: 'root',
})
export class UserService extends BaseService<UserMdl> {
  constructor(httpClient: HttpClient) {
    super(httpClient);
    this.temp = [
      {
        Name: "Engin Özdemir",
        ID: "e1"
      },
      {
        Name: "Emine Özdemir",
        ID: "e2"
      },
      {
        Name: "Emrah Aral",
        ID: "e3"
      }
    ]
  }

}
