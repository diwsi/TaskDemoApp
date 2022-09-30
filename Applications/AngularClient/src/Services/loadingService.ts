import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';





@Injectable({
  providedIn: 'root'
})
export class LoadingHandlerService {

  public numberOfRequests: number = 0;
  public showSpinner: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  handleRequest = (state: string = 'minus'): void => {
    this.numberOfRequests = (state === 'plus') ? this.numberOfRequests + 1 : this.numberOfRequests - 1;
    this.showSpinner.next(this.numberOfRequests > 0);
  };

}

@Injectable()
export class LoadingService implements HttpInterceptor {

  constructor(
    public spinnerHandler: LoadingHandlerService
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.spinnerHandler.handleRequest('plus');
    return next
      .handle(request)
      .pipe(
        finalize(this.finalize.bind(this))
      );
  }

  finalize = (): void => this.spinnerHandler.handleRequest();
}

