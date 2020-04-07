import { Component, OnInit, ViewChild, ChangeDetectorRef, AfterViewInit, ElementRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { UploadService } from 'src/app/upload.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { VideoGuidelineComponent } from '../video-guideline/video-guideline.component';

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
  @ViewChild('footer') footer: ElementRef;

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
  loader: boolean;

  constructor(private dom: DomSanitizer,
              private cd: ChangeDetectorRef,
              private uploadService: UploadService,
              private router: Router,
              private dialog: MatDialog ) { }

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
    this.dialog.open(VideoGuidelineComponent).afterClosed().subscribe(res => {
      if (res) {
        this.startCamera();
        setTimeout(() => {
          this.hideVideo = false;
          this.mediaRecorder.start();
          this.increment();
          this.footer.nativeElement.scrollIntoView({behavior: 'smooth'});
        }, 3000);
      }
    });
  }

  stopRecording() {
    this.clear = true;
    this.hideVideo = true;
    this.mediaRecorder.stop();
  }

  startCamera() {
    const constraint =   {
      video: { facingMode: 'user '},
      audio: { echoCancellation: {exact: true} }
    };
    const nav = <any> navigator;
    nav.getUserMedia = ( nav.getUserMedia ||
      nav.webkitGetUserMedia ||
      nav.mozGetUserMedia ||
      nav.msGetUserMedia);

    nav.getUserMedia(constraint,
      stream => {
        this.video.srcObject = stream;
        this.video.play();
        this.mediaRecorder = new MediaRecorder(stream);
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
      this.router.navigate(['/success-message']);
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
