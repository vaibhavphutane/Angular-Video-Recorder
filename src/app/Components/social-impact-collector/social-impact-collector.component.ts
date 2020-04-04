import { Component, OnInit, ViewChild, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { UploadService } from 'src/app/upload.service';

declare var MediaRecorder: any;

@Component({
  selector: 'app-social-impact-collector',
  templateUrl: './social-impact-collector.component.html',
  styleUrls: ['./social-impact-collector.component.css']
})
export class SocialImpactCollectorComponent implements OnInit, AfterViewInit {

  hideVideo: boolean;
  @ViewChild('videoElement') videoElement: any;
  @ViewChild('recordedVideoElement') recordedVideoElement: any;
  video: any;
  recordVideo: any;
  recordedStream = [];
  mediaRecorder: any;
  recordedBlob: Blob;
  hideRecoredVideo: boolean;

  constructor(private dom: DomSanitizer,
              private cd: ChangeDetectorRef,
              private uploadService: UploadService) { }

  ngOnInit(): void {
    this.hideVideo = true;
    this.hideRecoredVideo = true;
  }

  ngAfterViewInit() {
    this.video = this.videoElement.nativeElement;
    this.recordVideo = this.recordedVideoElement.nativeElement;
  }


  startRecording() {
    this.startCamera();
    setTimeout(() => {
      this.hideVideo = false;
      this.mediaRecorder.start();
      console.log(this.mediaRecorder.state);
      console.log('recorder started');
    }, 3000);

  }

  stopRecording() {
    this.hideVideo = true;
    this.mediaRecorder.stop();
    console.log(this.mediaRecorder.state);
    console.log('recorder started');
  }

  startCamera() {
    const constraint =   {
      video: { facingMode: 'user '},
      audio: { echoCancellation: {exact: true} }
    };
    navigator.getUserMedia(constraint,
      stream => {
        this.video.srcObject = stream;
        this.video.play();
        this.mediaRecorder = new MediaRecorder(stream);
        this.mediaRecorder.onstop = e => {
          this.recordedBlob = new Blob(this.recordedStream, { type: 'video/webm' });
          this.recordedStream = [];
          const videoURL = URL.createObjectURL(this.recordedBlob);
          this.recordVideo.src = videoURL;
          this.hideRecoredVideo = false;
          this.recordVideo.play();
          this.cd.detectChanges();
        };
        this.mediaRecorder.ondataavailable = e => {
          this.recordedStream.push(e.data);
        };
      },
      () => {
        alert('Error capturing audio.');
      },
    );
  }

  submit() {
    this.uploadService.uploadVideo(this.recordedBlob).subscribe(res => {
      console.log(res);
    });
  }
}
