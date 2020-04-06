import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoGuidelineComponent } from './video-guideline.component';

describe('VideoGuidelineComponent', () => {
  let component: VideoGuidelineComponent;
  let fixture: ComponentFixture<VideoGuidelineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoGuidelineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoGuidelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
