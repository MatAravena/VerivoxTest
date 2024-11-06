import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TariffService } from '../../services/tariff/tariff-service.service';
import { Tariff } from '../../models/tariff';
import { HttpClientModule } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-tariff-list',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule],
  templateUrl: './tariff-list.component.html',
  styleUrl: './tariff-list.component.scss',
  providers: [TariffService]
})
export class TariffListComponent {
  tariffs$!: Observable<Tariff[]>;
  sortAscending: boolean = true;

  constructor(private tariffService: TariffService) {}

  ngOnInit() { 
    this.getListTariffs();
    this.tariffService.getAllTariffs().pipe(
      
    )

  }

  getListTariffs() {
    this.tariffs$ = this.tariffService.getListTariffs().pipe(
      map(tariffs =>
        tariffs.sort((a, b) => this.sortAscending ? a.price - b.price : b.price - a.price)
      )
    );
  }

  getAllTariffs() {
    const observer = {
      next: (data: Tariff[]) => {
        console.log('Fetched tariffs 2');
        console.log('result data ',data )
        // this.tariffs$ = data;
      },
      error: (error: any) => console.error('Error fetching tariffs', error),
      complete: () => console.log('Completed fetching tariffs')
    };

    this.tariffService.getAllTariffs().subscribe(observer);
  }

  sortTariffs() {
    this.sortAscending = !this.sortAscending;
    this.getListTariffs();
  }

  addToCompare(tariff: Tariff) {
    this.tariffService.updateTariff(tariff) 
  }

}
