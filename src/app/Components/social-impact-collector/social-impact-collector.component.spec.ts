import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialImpactCollectorComponent } from './social-impact-collector.component';

describe('SocialImpactCollectorComponent', () => {
  let component: SocialImpactCollectorComponent;
  let fixture: ComponentFixture<SocialImpactCollectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocialImpactCollectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialImpactCollectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
