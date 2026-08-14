import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Quizlist } from './quizlist1';

describe('Quizlist', () => {
  let component: Quizlist;
  let fixture: ComponentFixture<Quizlist>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Quizlist],
    }).compileComponents();

    fixture = TestBed.createComponent(Quizlist);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
