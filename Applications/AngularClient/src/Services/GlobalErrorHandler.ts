import { Injectable, ErrorHandler } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";
 

/**  Listens http errors */
@Injectable({
  providedIn: "root",
})
export class  HttpErrorHandler implements ErrorHandler {
  constructor( 
  ) { }

  handleError(error: Error | HttpErrorResponse) {
    if (error instanceof HttpErrorResponse) {
      // Server error
      alert("HTTP ERROR:"+ error.message);
    }  
  }
}
