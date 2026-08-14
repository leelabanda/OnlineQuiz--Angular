import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Answerreview } from './answerreview';

describe('Answerreview', () => {
  let component: Answerreview;
  let fixture: ComponentFixture<Answerreview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Answerreview],
    }).compileComponents();

    fixture = TestBed.createComponent(Answerreview);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
