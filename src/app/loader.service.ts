import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()

export class LoaderService {

  constructor() { }

  public status: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public message: BehaviorSubject<string> = new BehaviorSubject<string>('Uploading! Please wait');

    display(value: boolean) {
        console.log(value);
        this.status.next(value);
    }

    displayMessage(msg?: string) {
      this.message.next(msg);
    }
}
