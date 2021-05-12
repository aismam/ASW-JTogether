import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartecipatedActivityComponent } from './partecipated-activity.component';

describe('PartecipatedActivityComponent', () => {
  let component: PartecipatedActivityComponent;
  let fixture: ComponentFixture<PartecipatedActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartecipatedActivityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartecipatedActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
