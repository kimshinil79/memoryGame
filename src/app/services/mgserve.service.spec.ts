import { TestBed } from '@angular/core/testing';

import { MGserveService } from './mgserve.service';

describe('MGserveService', () => {
  let service: MGserveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MGserveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
