import { TestBed } from '@angular/core/testing';

import { Questionservice } from './questionservice';

describe('Questionservice', () => {
  let service: Questionservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Questionservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
