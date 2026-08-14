import { TestBed } from '@angular/core/testing';

import { Quizlist } from './quizlist';

describe('Quizlist', () => {
  let service: Quizlist;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Quizlist);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
