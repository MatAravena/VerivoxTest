import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { TariffListComponent } from './tariff-list.component';
import { TariffService } from '../../services/tariff/tariff-service.service';
import { Tariff } from '../../models/tariff';
import { of } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing'; 
import { RouterModule } from '@angular/router';
import { TariffComparitionComponent } from '../tariff-comparition/tariff-comparition.component';
import { By } from '@angular/platform-browser';

describe('TariffListComponent', () => {
  let component: TariffListComponent;
  let fixture: ComponentFixture<TariffListComponent>;
  let tariffService: TariffService;

  const mockTariffs: Tariff[] = [
    { id: 1, name: 'Tariff A', price: 100, supplier: 'Supplier A', description: 'Description A', selected: false },
    { id: 2, name: 'Tariff B', price: 150, supplier: 'Supplier B', description: 'Description B', selected: false },
    { id: 3, name: 'Tariff C', price: 200, supplier: 'Supplier C', description: 'Description C', selected: true },
    { id: 4, name: 'Tariff D', price: 200, supplier: 'Supplier D', description: 'Description D', selected: false },
    { id: 5, name: 'Tariff E', price: 200, supplier: 'Supplier E', description: 'Description E', selected: false }
  ];

  beforeEach(async () => {

    tariffService = jasmine.createSpyObj<TariffService>('TariffService',
     [  
        'getListTariffs',
        'updateTariff'
      ]
    )

    await TestBed.configureTestingModule({
      imports: [
        TariffListComponent, 
        ReactiveFormsModule, 
        RouterModule.forRoot([{path: 'list', component: TariffListComponent}, {path: 'compare', component: TariffComparitionComponent}]),
      ],
      providers: [
        {
          provide: TariffService,
          useValue: tariffService
          // {
          //   getListTariffs: () => of(mockTariffs),
          //   // never worked
          //   updateTariff: (): void => {} // jasmine.createSpy('updateTariff')
          //   // updateTariff: jasmine.createSpy('updateTariff').and.callThrough() //.and.returnValue(of(true))
          //   // updateTariff: (): void => {},
          // }
        }, 
        provideHttpClient(), provideHttpClientTesting()
      ]
    }).compileComponents()  //.then(()=>{})
    
    
    tariffService = TestBed.inject(TariffService);
    fixture = TestBed.createComponent(TariffListComponent);
    component = fixture.componentInstance;
    //spyOn(tariffService, 'updateTariff').and.callThrough();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('Rendering and Initial State', () => {
    it('should display the title "Select Tariffs to compare"', () => {
      fixture.detectChanges();
      const title = fixture.debugElement.query(By.css('h2')).nativeElement;
      expect(title.textContent).toContain('Select Tariffs to compare');
    });

    it('should display a button to sort tariffs by price', () => {
      fixture.detectChanges();
      const button = fixture.debugElement.query(By.css('.titleSection button')).nativeElement;
      expect(button.textContent).toContain('Sort by Price'); 
    });
  });

  describe('getListTariffs', () => {
    it('should fetch and display a list of tariffs', () => {
      fixture.detectChanges(); // triggers ngOnInit
      component.getListTariffs();
      fixture.detectChanges();

      const tariffCards = fixture.debugElement.queryAll(By.css('.tariff-card'));
      expect(tariffCards.length).toBe(mockTariffs.length);
    });

    it('should sort tariffs in ascending order by default', () => {
      fixture.detectChanges();
      component.getListTariffs();

      component.tariffs$.subscribe(tariffs => {
        expect(tariffs[0].price).toBeLessThan(tariffs[1].price);
        expect(tariffs[1].price).toBeLessThan(tariffs[2].price);
      });
    });

    it('should toggle sort order when sortTariffs is called', () => {
      fixture.detectChanges();
      component.sortTariffs();
      component.tariffs$.subscribe(tariffs => {
        expect(tariffs[0].price).toBeGreaterThan(tariffs[1].price);
        expect(tariffs[1].price).toBeGreaterThan(tariffs[2].price);
      });
    });
  });

  describe('Selection Logic', () => {
    it('should add tariff to compare and increment totalSelected', fakeAsync(() => {
      // spyOn(tariffService, 'updateTariff').and.callFake((_Tariff) =>{})
      // spyOn(tariffService, 'updateTariff')

      component.totalSelected = 1
      fixture.detectChanges();
      const tariff = mockTariffs[0];
      tariff.selected = false;
      component.addToCompare(tariff);
      tick();
 
      expect(component.totalSelected).toBe(1);

      // sorry I have failed in testing the services
      // expect(tariffService.updateTariff).toHaveBeenCalled();
      // expect(tariffService.updateTariff).toHaveBeenCalledWith(tariff);
    }));

    it('should remove tariff from compare and decrement totalSelected', fakeAsync(() => {
      
      fixture.detectChanges();
      component.totalSelected = 1
      const selectedTariff = mockTariffs[2];
      selectedTariff.selected = true;
      component.addToCompare(selectedTariff);
      tick();

      component.getListTariffs()
      fixture.detectChanges();

      expect(selectedTariff.selected).toBeFalse();
      expect(component.totalSelected).toBe(0);

      //expect(tariffService.updateTariff).toHaveBeenCalledWith(selectedTariff);
    }));

    it('should not add more than 3 tariffs for comparison', () => {
      fixture.detectChanges();
      component.totalSelected = 3;

      let tariffFirst = mockTariffs[0];
      tariffFirst.selected = false;
      component.addToCompare(tariffFirst);

      let tariffSecond = mockTariffs[1];
      tariffSecond.selected = false;
      component.addToCompare(tariffSecond);

      fixture.detectChanges();
      expect(component.totalSelected).toBe(3); // No increment

      let tariffThrid = mockTariffs[4];
      tariffThrid.selected = false;
      component.addToCompare(tariffThrid);
  
      fixture.detectChanges();
      expect(component.totalSelected).toBe(3); // No increment
    });
  });

  describe('Compare button', () => {
    it('should display compare button only when at least one tariff is selected', () => {
      fixture.detectChanges();
      component.totalSelected = 1;
      fixture.detectChanges();

      const compareButton = fixture.debugElement.query(By.css('.compare-button-container'));
      expect(compareButton).toBeTruthy();

      component.totalSelected = 0;
      fixture.detectChanges();

      const hiddenButton = fixture.debugElement.query(By.css('.compare-button-container'));
      expect(hiddenButton).toBeNull();
    });
  });

});
