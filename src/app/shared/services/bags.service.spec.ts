import { TestBed } from '@angular/core/testing';

import { BagsService } from './bags.service';

describe('BagsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BagsService = TestBed.get(BagsService);
    expect(service).toBeTruthy();
  });
});
