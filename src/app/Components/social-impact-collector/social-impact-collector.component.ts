import { Component, OnInit, ViewChild, ChangeDetectorRef, AfterViewInit, ElementRef, NgZone } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { UploadService } from 'src/app/upload.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { VideoGuidelineComponent } from '../video-guideline/video-guideline.component';
import { SocialImpactComponent } from '../social-impact/social-impact.component';
import { Subscription } from 'rxjs';
import { LoaderService } from 'src/app/loader.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';

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
  @ViewChild('file') iosFile: any;

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
  guideLineDialog: Subscription;
  isIos: boolean;
  iosVideoFile: File;
  recordingCountDown: number;
  showCountDown: boolean;

  constructor(private dom: DomSanitizer,
              private cd: ChangeDetectorRef,
              private uploadService: UploadService,
              private router: Router,
              private dialog: MatDialog,
              private ngZone: NgZone,
              private loaderService: LoaderService
  ) { }

  ngOnInit(): void {
    this.isIos = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
    this.timer = 0;
    this.recordingCountDown = 10;
    this.hideVideo = true;
    this.hideRecoredVideo = true;
  }

  ngAfterViewInit() {
    this.video = this.videoElement.nativeElement;
    this.recordVideo = this.recordedVideoElement.nativeElement;
  }


  startRecording() {
    this.dialog.open(VideoGuidelineComponent).afterClosed().subscribe(res => {
      this.showCountDown = true;
      this.footer.nativeElement.scrollIntoView({ behavior: 'smooth' });
      this.decrement();
      if (res) {
        this.startCamera();
        setTimeout(() => {
          this.hideVideo = false;
          this.showCountDown = false;
          this.mediaRecorder.start();
          this.increment();
        }, 10000);
      }
    });
  }

  stopRecording() {
    this.clear = true;
    this.hideVideo = true;
    this.mediaRecorder.stop();
  }

  startCamera() {
    const constraint = {
      video: { facingMode: 'user ' },
      audio: { echoCancellation: { exact: true } }
    };
    const nav = <any>navigator;
    nav.getUserMedia = (nav.getUserMedia ||
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
    this.ngZone.run(() => this.loaderService.display(true));
    const payload = {
      email: this.email,
      videoBlob: this.isIos ? this.iosVideoFile : this.recordedBlob,
      duration: this.isIos ? -1 : this.timer
    };
    this.uploadService.uploadVideo(payload, this.isIos).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        console.log('upload progress', event.loaded / event.total + '%');
      } else if (event.type === HttpEventType.Response) {
        this.ngZone.run(() => this.loaderService.display(false));
        this.ngZone.run(() => this.router.navigate(['/uploaded-successfully']));
      }
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

  decrement() {
    this.recordingCountDown--;
    const timer = setTimeout(() => {
      if (this.recordingCountDown === 0) {
        clearTimeout(timer);
      } else {
        this.decrement();
      }
    }, 1000);
  }

  fileUpload(event) {
    this.iosVideoFile = event.target.files[0] as File;
    console.log(event.target.files[0]);
  }
}
