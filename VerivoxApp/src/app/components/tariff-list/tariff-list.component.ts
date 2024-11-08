import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TariffService } from '../../services/tariff/tariff-service.service';
import { Tariff } from '../../models/tariff'; 
import { map, Observable } from 'rxjs';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-tariff-list',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './tariff-list.component.html',
  styleUrl: './tariff-list.component.scss',
  providers: [TariffService]
})
export class TariffListComponent {
  tariffs$!: Observable<Tariff[]>;
  sortAscending: boolean = true;
  totalSelected = 0
  tariffForm: FormGroup;

  constructor(private fb: FormBuilder, private tariffService: TariffService) {
    this.tariffForm = this.fb.group({
      selections: this.fb.array([])
    });
  }

  ngOnInit() { 
    this.getListTariffs();
  }

  getListTariffs() {
    this.tariffs$ = this.tariffService.getListTariffs().pipe(
      map(tariffs =>
        tariffs.sort((a, b) => this.sortAscending ? a.price - b.price : b.price - a.price)
      )
    );
    this.tariffs$.pipe(map(tariffs => tariffs.filter(tariff => tariff.selected === true).length))
      .subscribe(count => this.totalSelected = count);
  }

  //Remove as is not used Httpclient
  // getAllTariffs() {
  //   const observer = {
  //     next: (data: Tariff[]) => {
  //       console.log('Fetched tariffs 2');
  //       console.log('result data ',data )
  //       // this.tariffs$ = data;
  //     },
  //     error: (error: any) => console.error('Error fetching tariffs', error),
  //     complete: () => console.log('Completed fetching tariffs')
  //   };

  //   this.tariffService.getListTariffs().subscribe(observer);
  // }

  sortTariffs() {
    this.sortAscending = !this.sortAscending;
    this.getListTariffs();
  }

  addToCompare(tariff: Tariff) {
    if (this.totalSelected < 3 || tariff.selected ) {
      tariff.selected = !tariff.selected
      this.tariffService.updateTariff(tariff)
    }
  }
}
