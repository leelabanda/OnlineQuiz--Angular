import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Viewquestions } from './viewquestions';

describe('Viewquestions', () => {
  let component: Viewquestions;
  let fixture: ComponentFixture<Viewquestions>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Viewquestions],
    }).compileComponents();

    fixture = TestBed.createComponent(Viewquestions);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
