import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

declare var MediaRecorder: any;
@Component({
  selector: 'app-social-impact',
  templateUrl: './social-impact.component.html',
  styleUrls: ['./social-impact.component.css']
})
export class SocialImpactComponent implements OnInit, AfterViewInit {

  @ViewChild('videoElement') videoElement: any;
  @ViewChild('recordedVideoElement') recordedVideoElement: any;
  video: any;
  recordVideo: any;
  recordedStream = [];
  mediaRecorder: any;

  constructor(private dom: DomSanitizer,
              private cd: ChangeDetectorRef) { }

  ngOnInit(): void {

  }

  ngAfterViewInit() {
    this.video = this.videoElement.nativeElement;
    this.recordVideo = this.recordedVideoElement.nativeElement;
  }

  startRecording() {
    this.openCamera();
    this.mediaRecorder.start();
    console.log(this.mediaRecorder.state);
    console.log('recorder started');
  }

  stopRecording() {
    this.mediaRecorder.stop();
    console.log(this.mediaRecorder.state);
    console.log('recorder started');
  }

  openCamera() {
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
          var blob = new Blob(this.recordedStream, { type: 'video/webm' });
          this.recordedStream = [];
          const videoURL = URL.createObjectURL(blob);
          this.recordVideo.src = videoURL;
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


}
