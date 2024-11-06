import { Routes } from '@angular/router';
import { TariffListComponent } from './components/tariff-list/tariff-list.component';
import { TariffComparitionComponent } from './components/tariff-comparition/tariff-comparition.component';

export const routes: Routes = [
    {path: '' , pathMatch: 'full', redirectTo: 'list'},
    {path: 'list' , component: TariffListComponent },
    {path: 'comparition' , component: TariffComparitionComponent },
];
