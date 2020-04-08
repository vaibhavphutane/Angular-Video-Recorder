import { Component, OnInit , AfterViewInit } from '@angular/core';
import { LoaderService } from 'src/app/loader.service';

@Component({
  selector: 'app-my-loader',
  templateUrl: './my-loader.component.html',
  styleUrls: ['./my-loader.component.scss']
})
export class LoaderComponent implements OnInit, AfterViewInit {
  msg: string;
  constructor(private loader: LoaderService) { }

  ngOnInit() {
  }


  ngAfterViewInit() {
    this.loader.message.subscribe((message: string) => {
      if (message) {
        this.msg = message;
      } else {
        this.msg = 'Uploading ! Please wait';
      }
      });
  }

}
