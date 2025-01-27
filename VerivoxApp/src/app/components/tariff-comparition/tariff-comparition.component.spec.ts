import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TariffComparitionComponent } from './tariff-comparition.component';
import { TariffService } from '../../services/tariff/tariff-service.service';
import { Tariff } from '../../models/tariff';
import { BehaviorSubject, of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TariffListComponent } from '../tariff-list/tariff-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

describe('TariffComparitionComponent', () => {
  let component: TariffComparitionComponent;
  let fixture: ComponentFixture<TariffComparitionComponent>;
  let tariffService: TariffService;

  const mockTariffs: Tariff[] = [
    { id: 1, name: 'Tariff A', price: 100, supplier: 'Supplier A', description: 'Description A', selected: true },
    { id: 2, name: 'Tariff B', price: 150, supplier: 'Supplier B', description: 'Description B', selected: true },
    { id: 3, name: 'Tariff C', price: 200, supplier: 'Supplier C', description: 'Description C', selected: false }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TariffComparitionComponent, // Import standalone component here
        ReactiveFormsModule,        // Import ReactiveFormsModule for form testing, 
        RouterModule.forRoot([{path: 'list', component: TariffListComponent}, {path: 'compare', component: TariffComparitionComponent}])
      ],
      // declarations: [TariffComparitionComponent],
      providers: [
        {
          provide: TariffService,
          useValue: {
            getListTariffs: () => of(mockTariffs)
          }
        }, provideHttpClient(), provideHttpClientTesting()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TariffComparitionComponent);
    component = fixture.componentInstance;
    tariffService = TestBed.inject(TariffService);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('Rendering and Initial State', () => {
    it('should display "Compare Selected Tariffs" header when there are selected tariffs', () => {
      fixture.detectChanges(); //trigger ngOnInit
      const header = fixture.debugElement.query(By.css('.compare-container h2')).nativeElement;
      expect(header.textContent).toContain('Compare Selected Tariffs');
    });

    it('should display "No tariffs selected for comparison." when no tariffs are selected', () => {

      // Modify mock data for this test case
      mockTariffs[0].selected = false;
      mockTariffs[1].selected = false;
      mockTariffs[2].selected = false;
      component.tariffsLength = 0

      //spyOn(tariffService, 'getListTariffs').and.returnValue(of(mockTariffs.map(t => ({ ...t, selected: false }))));
      spyOn(tariffService, 'getListTariffs').and.returnValue(new BehaviorSubject(mockTariffs));
 
      component.getListTariffs();
      fixture.detectChanges();

      const noTariffsMessage = fixture.debugElement.query(By.css('h2')).nativeElement;
      fixture.detectChanges();
      expect(noTariffsMessage.textContent).toContain('No tariffs selected for comparison.');
    });
  });

  describe('#getListTariffs', () => {
    it('should filter and display only selected tariffs', () => {
      component.getListTariffs(); 
      fixture.detectChanges();
      const displayedTariffs = fixture.debugElement.queryAll(By.css('.tariff-card'));
      expect(displayedTariffs.length).toBe(2);

      const firstTariff = displayedTariffs[0].nativeElement;
      const secondTariff = displayedTariffs[1].nativeElement;

      expect(firstTariff.textContent).toContain('Tariff A');
      expect(secondTariff.textContent).toContain('Tariff B');
    });

    it('should display tariffs sorted by price in ascending order', () => {
      component.getListTariffs();
      fixture.detectChanges();

      const displayedTariffs = fixture.debugElement.queryAll(By.css('.tariff-card'));

      const firstTariffPrice = parseInt(displayedTariffs[0].query(By.css('p')).nativeElement.textContent.match(/\d+/)[0], 10);
      const secondTariffPrice = parseInt(displayedTariffs[1].query(By.css('p')).nativeElement.textContent.match(/\d+/)[0], 10);

      expect(firstTariffPrice).toBeLessThan(secondTariffPrice);
    });
  });

  describe('Tariff Count Display', () => {
    it('should update tariffsLength to reflect the number of selected tariffs', () => {
      fixture.detectChanges();
      spyOn(tariffService, 'getListTariffs').and.returnValue(new BehaviorSubject(mockTariffs));
      component.getListTariffs()

      fixture.detectChanges(); 
      expect(component.tariffsLength).toBe(2); // Only 2 tariffs are selected in mockTariffs
    });

    it('should display the correct number of tariff cards based on tariffsLength', () => {
      fixture.detectChanges();
      component.getListTariffs();
      fixture.detectChanges();

      const tariffCards = fixture.debugElement.queryAll(By.css('.tariff-card'));
      expect(tariffCards.length).toBe(component.tariffsLength);
    });
  });
});
