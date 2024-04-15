import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SentimentLandingComponent } from './sentiment-landing.component';

describe('SentimentLandingComponent', () => {
  let component: SentimentLandingComponent;
  let fixture: ComponentFixture<SentimentLandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SentimentLandingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SentimentLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
