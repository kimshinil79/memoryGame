import { TestBed } from '@angular/core/testing';

import { CompareMovieService } from './compare-movie.service';

describe('CompareMovieService', () => {
  let service: CompareMovieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompareMovieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
