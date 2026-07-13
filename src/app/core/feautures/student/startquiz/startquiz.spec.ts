import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Startquiz } from './startquiz';

describe('Startquiz', () => {
  let component: Startquiz;
  let fixture: ComponentFixture<Startquiz>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Startquiz],
    }).compileComponents();

    fixture = TestBed.createComponent(Startquiz);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
