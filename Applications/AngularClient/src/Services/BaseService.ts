import { KeyValue } from "../Models/KeyValue";

export abstract class BaseService<T> {

  public temp: T[];
  constructor() {
    this.temp = [];
  }

  public List(searchModel: KeyValue[] = []): T[] {
     
    return this.temp;
  }

  public Save(model: T): T {
    this.temp.push(model);
    return model;
  }

  public Delete(id: string) {
     
  }

}
