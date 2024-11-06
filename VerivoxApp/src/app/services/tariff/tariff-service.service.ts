import { Injectable } from '@angular/core';
import { Tariff } from '../../models/tariff';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MOCK_TARIFFS } from '../../mock/mockTariffs';
import { BehaviorSubject, catchError, finalize, map, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TariffService {

    readonly tariffsUrl = 'fake-api/mock-data';
    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    private tariffs$: BehaviorSubject<Tariff[]> = new BehaviorSubject<Tariff[]>( MOCK_TARIFFS );

    constructor(public http: HttpClient) {
    }

    getListTariffs() {
        return this.tariffs$;
    }

    updateTariff(tariffModify: Tariff ){
        return this.getListTariffs().pipe(
            map((tariffs) => tariffs.find((tariff) => tariff.selected === tariffModify.selected)));
    }

    getAllTariffs(): Observable<Tariff[]> {
        return this.http.get<Tariff[]>('api/getAllTariffs').pipe(
            finalize(() => console.log('Fetched tariffs 1')),
            catchError(this.handleError<Tariff[]>('getAllTariffs', []))
          );
        // return this.http.get<Tariff[]>(this.tariffsUrl).pipe(
        //     finalize(() => console.log('Fetched tariffs 1')),
        //     catchError(this.handleError<Tariff[]>('getAllTariffs', []))
        // );
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.error('handleError', error); // log to console instead
            this.log(`${operation} failed: ${error.message}`); 
            return of(result as T);
        };
    }

    private log(message: string) {
        // this.messageService.add(`HeroService: ${message}`);
        console.error('Error: ', message)
    }
}


