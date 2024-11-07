import { Component } from '@angular/core';
import { Tariff } from '../../models/tariff';
import { TariffService } from '../../services/tariff/tariff-service.service';
import { map, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-tariff-comparition',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './tariff-comparition.component.html',
  styleUrl: './tariff-comparition.component.scss'
})
export class TariffComparitionComponent {
  tariffs$!: Observable<Tariff[]>;

  constructor(private tariffService: TariffService) {}

  ngOnInit() { 
    this.getListTariffs();
  }

  getListTariffs() {
    this.tariffs$ = this.tariffService.getListTariffs().pipe(
      map(tariffs => 
        tariffs.sort((a, b) =>  a.price - b.price)
                .filter(tariff  => tariff.selected === true) )
    );
  }

  addToCompare(tariff: Tariff) {
    let totalSelected = 0
    this.tariffs$.pipe(map(tariffs => tariffs.filter(tariff => tariff.selected === true).length))
      .subscribe(count => totalSelected = count);

    if (totalSelected < 3 || tariff.selected ) {
      tariff.selected = !tariff.selected
      this.tariffService.updateTariff(tariff)
    }
  }
  
}
