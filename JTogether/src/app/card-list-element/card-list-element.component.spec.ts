import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardListElementComponent } from './card-list-element.component';

describe('CardListElementComponent', () => {
  let component: CardListElementComponent;
  let fixture: ComponentFixture<CardListElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardListElementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardListElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
