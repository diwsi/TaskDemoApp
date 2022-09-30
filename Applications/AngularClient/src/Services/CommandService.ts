import { EventEmitter, Injectable } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';


/**  Routing params abstraction */
@Injectable({
  providedIn: 'root',
})
export class CommandService {
  /**  prefix list */
  public PREF_COMMAND: string = "c";
  public PREF_NEW: string = "new";
  public PREF_EDIT: string = "edit";
  public PREF_DELETE: string = "del";
  public PREF_ID: string = "id";

  OnCommand: EventEmitter<Params> = new EventEmitter();

  constructor(private route: ActivatedRoute, private router: Router) {
 
    this.route.queryParams.subscribe(params => {
      this.OnCommand.emit(params);
    });
  }
  /**  modify  router*/
  public SetComand(command: Params): void {
  
    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParams: command,
        queryParamsHandling: 'merge',
      });
  }
}
