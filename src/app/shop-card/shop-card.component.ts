import { Component, OnInit, Input } from '@angular/core';
import { DateTime } from "luxon";

interface productData {
  ProductId: number;
	ProductName: string;
	UnitName: string;
  DeliveryTimes: Array<{ min: number, max: number, time: number }>[];
}

@Component({
  selector: 'app-shop-card',
  templateUrl: './shop-card.component.html',
  styleUrls: ['./shop-card.component.scss']
})
export class ShopCardComponent implements OnInit {
  @Input() product:productData = {
    ProductId: -1,
    ProductName: '',
    UnitName: '',
    DeliveryTimes: []
  };
  orderAmount:number = 0;
  deliveryDays:number = 0;

  async calculateOrdertime (orderAmount:number) {
    let currDay = DateTime.now()
    const Sunday = 7;
    const Saturday = 6;

    const dt:any = this.product.DeliveryTimes.find((dt:any, idx: number) => dt.min < orderAmount && dt.max > orderAmount)
    this.deliveryDays = dt === undefined ? NaN : dt.time
    
    while (this.deliveryDays > 0) {
      console.log(currDay.toISO())
      if (![Sunday, Saturday].includes(currDay.weekday)) {
        this.deliveryDays --
      }
      currDay = currDay.plus({ day: 1 })
    }
    console.log('ferdig')
    console.log(currDay.toISO())
  }

  constructor() { }

  ngOnInit(): void {
  }

}
