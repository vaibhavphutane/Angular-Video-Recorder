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
  phone: string;
  email: string;
  timer: number;
  timerCounter: any;
  clear: boolean;

  constructor(private dom: DomSanitizer,
              private cd: ChangeDetectorRef,
              private uploadService: UploadService) { }

  ngOnInit(): void {
    this.timer = 0;
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
      this.increment();
    }, 3000);
  }

  stopRecording() {
    this.clear = true;
    this.hideVideo = true;
    this.mediaRecorder.stop();
    this.video.pause();
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
        const options = { mimeType: 'video/webm;codecs=h264' };
        this.mediaRecorder = new MediaRecorder(stream, options);
        this.mediaRecorder.onstop = e => {
          this.video.pause();
          this.recordedBlob = new Blob(this.recordedStream, { type: 'video/mp4' });
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
    const payload = {
      email: this.email,
      videoBlob: this.recordedBlob,
      duration: this.timer
    };
    this.uploadService.uploadVideo(payload).subscribe(res => {
      console.log(res);
    });
  }


  increment() {
    this.timerCounter = setTimeout(() => {
      this.timer++;
      if (this.timer === 60) {
        this.stopRecording();
      }
      if (this.clear) {
        clearTimeout(this.timerCounter);
      } else {
        this.increment();
      }
    }, 1000);

  }
}
