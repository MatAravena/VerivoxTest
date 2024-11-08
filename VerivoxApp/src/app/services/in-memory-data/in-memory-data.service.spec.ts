import { TestBed } from '@angular/core/testing';
import { InMemoryDataService } from './in-memory-data.service';
import { MOCK_TARIFFS } from '../../mock/mockTariffs';
import { Tariff } from '../../models/tariff';
import { of } from 'rxjs';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('InMemoryDataService', () => {
  let service: InMemoryDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InMemoryDataService, provideHttpClient(), provideHttpClientTesting()]
    });
    service = TestBed.inject(InMemoryDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#createDb', () => {
    it('should return a database object containing mock-data', () => {
      const db = service.createDb();
      expect(db).toEqual({ 'mock-data': MOCK_TARIFFS });
    });
  });

  describe('#generateId', () => {
    it('should generate a new ID based on the highest ID in the tariffs array', () => {
      const newId = service.generateId(MOCK_TARIFFS);
      const maxId = Math.max(...MOCK_TARIFFS.map(tariff => tariff.id));
      expect(newId).toBe(maxId + 1);
    });

    it('should return 11 if the tariffs array is empty', () => {
      const newId = service.generateId([]);
      expect(newId).toBe(11);
    });
  });

  describe('#getAllTarrifs', () => {
    it('should return an observable containing all tariffs with a status of 200', (done) => {
      const reqInfo = {
        utils: {
          createResponse$: (fn: Function) => of(fn())
        }
      };

      service.getAllTarrifs(reqInfo).subscribe(response => {
        expect(response.body).toEqual(MOCK_TARIFFS);
        expect(response.status).toBe(200);
        done();
      });
    });
  });

  describe('#updateItem', () => {
    it('should update an existing item and return the updated item with a status of 200', (done) => {

      const updatedTariff: Tariff = {
        id: MOCK_TARIFFS[0].id, name: 'Updated Tariff', price: 99,
        supplier: '',
        description: ''
      };
      const reqInfo = {
        id: updatedTariff.id,
        utils: {
          createResponse$: (fn: Function) => of(fn()),
          getJsonBody: () => updatedTariff
        },
        req: {}
      };

      service.updateItem(reqInfo).subscribe(response => {
        expect(response.body).toEqual(updatedTariff);
        expect(response.status).toBe(200);

        const updatedIndex = service.tariffs.findIndex(t => t.id === updatedTariff.id);
        expect(service.tariffs[updatedIndex]).toEqual(updatedTariff);
        done();
      });
    });

    it('should return a 404 error if the item does not exist', (done) => {
      const nonExistentId = 999;
      const reqInfo = {
        id: nonExistentId,
        utils: {
          createResponse$: (fn: Function) => of(fn()),
          getJsonBody: () => ({ id: nonExistentId, name: 'Nonexistent Tariff', price: 200 })
        },
        req: {}
      };

      service.updateItem(reqInfo).subscribe(response => {
        expect(response.body).toEqual({ error: 'Item not found' });
        expect(response.status).toBe(404);
        done();
      });
    });
  });
});
