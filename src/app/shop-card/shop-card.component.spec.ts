import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DateTime } from "luxon";

import { ShopCardComponent } from './shop-card.component';

interface productData {
  ProductId: number;
	ProductName: string;
	UnitName: string;
  DeliveryTimes: Array<{ min: number, max: number, time: number }>;
}

describe('ShopCardComponent', () => {
  let component: ShopCardComponent;
  let fixture: ComponentFixture<ShopCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShopCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should return November 3, 2022', () => {
    const productData: productData = { ProductId: 1, ProductName: 'x', UnitName: 'x', DeliveryTimes: [{ min: 10, max: 20, time: 2 }] };

    component.product = productData
    component.calculateOrdertime(15, false, DateTime.fromISO('2022-11-01T15:00:00'))
    expect(component.deliveryDays).toBe('November 3, 2022')
  })
  it('should return November 2, 2022', () => {
    const productData: productData = { ProductId: 1, ProductName: 'x', UnitName: 'x', DeliveryTimes: [{ min: 10, max: 20, time: 2 }] };

    component.product = productData
    component.calculateOrdertime(15, true, DateTime.fromISO('2022-11-01T15:00:00'))
    expect(component.deliveryDays).toBe('November 2, 2022')
  })
  it('should return November 4, 2022', () => {
    const productData: productData = { ProductId: 1, ProductName: 'x', UnitName: 'x', DeliveryTimes: [{ min: 50, max: 200, time: 3 }] };

    component.product = productData
    component.calculateOrdertime(75, false, DateTime.fromISO('2022-11-01T15:00:00'))
    expect(component.deliveryDays).toBe('November 4, 2022')
  })
  it('should return November 15, 2022', () => {
    const productData: productData = { ProductId: 1, ProductName: 'x', UnitName: 'x', DeliveryTimes: [{ min: 200, max: 1000, time: 10 }] };

    component.product = productData
    component.calculateOrdertime(500, false, DateTime.fromISO('2022-11-01T15:00:00'))
    expect(component.deliveryDays).toBe('November 15, 2022')
  })
});
