import { TestBed } from '@angular/core/testing';
import { TariffService } from './tariff-service.service';

import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { MOCK_TARIFFS } from '../../mock/mockTariffs';
import { Tariff } from '../../models/tariff';

describe('TariffService', () => {
  let service: TariffService;
  let httpClient: HttpClient;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });

    httpClient = TestBed.inject(HttpClient);
    service = new TariffService(httpClient);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Ensures that there are no outstanding requests
    httpMock.verify(); 
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#getListTariffs', () => {
    it('should return the initial list of tariffs from BehaviorSubject', () => {
      const tariffs = service.getListTariffs().getValue();
      expect(tariffs).toEqual(MOCK_TARIFFS);
    });
  });

  describe('#updateTariff', () => {
    it('should update an existing tariff in the BehaviorSubject', () => {
      const updatedTariff: Tariff = {
        id: 1, name: 'Updated Tariff', price: 100,
        supplier: '',
        description: ''
      };
      service.updateTariff(updatedTariff);

      const tariffs = service.getListTariffs().getValue();
      const index = tariffs.findIndex(t => t.id === updatedTariff.id);

      expect(index).not.toBe(-1);
      expect(tariffs[index]).toEqual(updatedTariff);
    });

    it('should not update if the tariff does not exist', () => {
      const nonExistentTariff: Tariff = {
        id: 999, name: 'Nonexistent Tariff', price: 200,
        supplier: '',
        description: ''
      };
      service.updateTariff(nonExistentTariff);

      const tariffs = service.getListTariffs().getValue();
      const index = tariffs.findIndex(t => t.id === nonExistentTariff.id);

      expect(index).toBe(-1); // Should not find the tariff
    });
  });

});
