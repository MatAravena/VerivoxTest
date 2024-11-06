import { TestBed } from '@angular/core/testing';

import { TariffServiceService } from './tariff-service.service';

describe('TariffServiceService', () => {
  let service: TariffServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TariffServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
