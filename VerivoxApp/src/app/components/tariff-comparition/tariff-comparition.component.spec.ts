import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TariffComparitionComponent } from './tariff-comparition.component';

describe('TariffComparitionComponent', () => {
  let component: TariffComparitionComponent;
  let fixture: ComponentFixture<TariffComparitionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TariffComparitionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TariffComparitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
