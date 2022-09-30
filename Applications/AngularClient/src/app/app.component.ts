import { Component } from '@angular/core';
import { LoadingHandlerService } from '../Services/loadingService';
 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AngularClient';
  loading: boolean = false;

  constructor(public loadingHandler: LoadingHandlerService
  ) {
    this.loadingHandler.showSpinner.subscribe(this.showSpinner.bind(this));
  }

  ngOnInit() {
  }
  showSpinner = (state: boolean): void => {
    this.loading = state;
  };
}
