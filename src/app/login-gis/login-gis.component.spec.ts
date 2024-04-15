import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginGisComponent } from './login-gis.component';

describe('LoginGisComponent', () => {
  let component: LoginGisComponent;
  let fixture: ComponentFixture<LoginGisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginGisComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoginGisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
