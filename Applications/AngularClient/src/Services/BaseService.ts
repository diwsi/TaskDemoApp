import { KeyValue } from "../Models/KeyValue";
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
export abstract class BaseService<T> {

  public temp: T[];
  public EndPoint: string = "";
  constructor(private httpClient: HttpClient) {
    this.temp = [];
  }
  private get basePath(): string {
    return environment.API + this.EndPoint;
  }
  public List(searchModel: KeyValue[] = []): Observable<T[]> {

    return this.httpClient.get<T[]>(this.basePath);

  }

  public Save(model: T): T {
    this.temp.push(model);
    return model;
  }

  public Delete(id: string) {

  }

}
