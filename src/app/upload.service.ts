import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private http: HttpClient) { }

  uploadVideo(payload: any, isIos: boolean) {
    const fd = new FormData();
    fd.append('email', payload.email);
    if (isIos) {
      fd.append('duration', payload.duration);
      fd.append('video', payload.videoBlob, payload.videoBlob.name);
    } else {
      fd.append('video', payload.videoBlob, 'video.mp4');
      fd.append('duration', String(payload.duration - 1));
    }
    return this.http.post('https://ntvmdrconfig730:8095/FUpload.svc/Upload/', fd, {
      reportProgress: true,
      observe: 'events'
    });
  }
}
