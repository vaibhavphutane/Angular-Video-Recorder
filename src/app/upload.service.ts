import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private http: HttpClient) { }

  uploadVideo(payload: any) {
    const fd = new FormData();
    fd.append('video', payload.videoBlob, 'video.mp4');
    fd.append('email', payload.email);
    fd.append('duration', String(payload.duration - 1));
    return this.http.post('http://localhost:80/FileUpload/FUpload.svc/Upload/', fd);
  }
}
