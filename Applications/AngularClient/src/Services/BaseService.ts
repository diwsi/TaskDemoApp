import { KeyValue } from "../Models/KeyValue";
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";

/**  Abstract Service  Methots*/
export abstract class BaseService<T> {

  public temp: T[];
  public EndPoint: string = "";
  constructor(private httpClient: HttpClient) {
    this.temp = [];
  }
  /**  Combine path by enviorment */
  private get basePath(): string {
    return environment.API + this.EndPoint;
  }

  /**  list of fetched data */
  public List(parameters: string=""): Observable<T[]> {
   
    return this.httpClient.get<T[]>(this.basePath + parameters);
  }
  /**   Get single entity */
  public Get(id: string ): Observable<T> {
    return this.httpClient.get<T>(this.basePath +"/"+ id);
  }

  /**  post to save */
  public Save(model: T): Observable<T> {
    return this.httpClient.post<T>(this.basePath, model);        
  }

  /** delete  entry*/
  public Delete(id: string): Observable<object> { 
    return this.httpClient.delete(this.basePath + "/" + id);    
  }

}
