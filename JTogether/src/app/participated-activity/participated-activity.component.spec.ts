import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipatedActivityComponent } from './participated-activity.component';

describe('ParticipatedActivityComponent', () => {
  let component: ParticipatedActivityComponent;
  let fixture: ComponentFixture<ParticipatedActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParticipatedActivityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticipatedActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
