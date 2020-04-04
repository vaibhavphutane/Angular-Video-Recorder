import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private http: HttpClient) { }

  uploadVideo(recordedBlob: any) {
    console.log(recordedBlob);
    const fd = new FormData();
    const file = new File([recordedBlob], 'recording');
    fd.append('data', file);
    console.log(fd);
    return this.http.post('http://localhost/FileUpload/FUpload.svc/Upload/', fd);
  }
}
