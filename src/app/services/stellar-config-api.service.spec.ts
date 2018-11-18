import { TestBed } from '@angular/core/testing';

import { StellarConfigApiService } from './stellar-config-api.service';

describe('StellarConfigApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StellarConfigApiService = TestBed.get(StellarConfigApiService);
    expect(service).toBeTruthy();
  });
});
