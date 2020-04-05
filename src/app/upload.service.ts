import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private http: HttpClient) { }

  uploadVideo(payload: any) {
    console.log(payload);
    const fd = new FormData();
    // const file = new File([payload.videoBlob], 'recording');
    fd.append('video', payload.videoBlob, 'video.webm');
    fd.append('email', payload.email);
    fd.append('phone', payload.phone);
    console.log(fd);
    // return this.http.post('http://localhost:80/FileUpload/FUpload.svc/Upload/', fd);
    return this.http.post('http://localhost:3000/upload', fd);
  }
}
