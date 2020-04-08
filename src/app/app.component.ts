import { Component, AfterViewInit } from '@angular/core';
import { LoaderService } from './loader.service';
import { startWith, delay, tap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {

  showLoader: boolean;

  constructor(private loader: LoaderService) {}

  ngAfterViewInit() {
    this.loader.status.pipe(
      startWith(null),
      delay(0),
      tap(() => this.showLoader = false)
    ).subscribe((val: boolean) => {
      this.showLoader = val;
    });
  }
}
