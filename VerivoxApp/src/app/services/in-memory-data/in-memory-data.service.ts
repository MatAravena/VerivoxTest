import { Injectable } from '@angular/core';
import { MOCK_TARIFFS } from '../../mock/mockTariffs';
import { Tariff } from '../../models/tariff';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDataService {
  tariffs = MOCK_TARIFFS;

  constructor() { }

  createDb() {
    return { 'mock-data': MOCK_TARIFFS };
  }

  generateId(tariffs: Tariff[]): number {
    return tariffs.length > 0 ? Math.max(...tariffs.map(tariff => tariff.id)) + 1 : 11;
  }

  getAllTarrifs(reqInfo: any): Observable<any> {
    const items = this.tariffs;
    return reqInfo.utils.createResponse$(() => ({
      body: items,
      status: 200,
    }));
  }

  updateItem(reqInfo: any): Observable<any> {
    const id = reqInfo.id;
    const updatedItem = reqInfo.utils.getJsonBody(reqInfo.req);
    const index = this.tariffs.findIndex((i: any) => i.id === id);

    if (index !== -1) {
      this.tariffs[index] = { ...this.tariffs[index], ...updatedItem };
      return reqInfo.utils.createResponse$(() => ({
        body: this.tariffs[index],
        status: 200,
      }));
    } else {
      return reqInfo.utils.createResponse$(() => ({
        body: { error: 'Item not found' },
        status: 404,
      }));
    }
  }

}
