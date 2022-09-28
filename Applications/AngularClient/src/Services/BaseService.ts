
export abstract class BaseService<T> {

  public temp: T[];
  constructor() {
    this.temp = [];
  }

  public List(): T[] {
     
    return this.temp;
  }

  public Save(model: T): T {
    this.temp.push(model);
    return model;
  }

  public Delete(id: string) {
     
  }

}
