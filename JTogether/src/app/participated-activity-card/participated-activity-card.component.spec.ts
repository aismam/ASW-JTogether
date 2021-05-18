import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipatedActivityCardComponent } from './participated-activity-card.component';

describe('ParticipatedActivityCardComponent', () => {
  let component: ParticipatedActivityCardComponent;
  let fixture: ComponentFixture<ParticipatedActivityCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParticipatedActivityCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticipatedActivityCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
