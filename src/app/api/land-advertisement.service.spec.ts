import { TestBed } from '@angular/core/testing';

import { LandAdvertisementService } from './land-advertisement.service';

describe('LandAdvertisementService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LandAdvertisementService = TestBed.get(LandAdvertisementService);
    expect(service).toBeTruthy();
  });
});
