import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

declare var MediaRecorder: any;
@Component({
  selector: 'app-social-impact',
  templateUrl: './social-impact.component.html',
  styleUrls: ['./social-impact.component.css']
})
export class SocialImpactComponent implements OnInit, AfterViewInit {

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() { }
}
