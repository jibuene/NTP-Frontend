import { Component, OnInit, Input } from '@angular/core';
import { DateTime } from "luxon";

interface productData {
  ProductId: number;
	ProductName: string;
	UnitName: string;
  DeliveryTimes: Array<{ min: number, max: number, time: number }>;
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
  deliveryDays:string = 'Na';
  expressShipping: boolean = false;

  async calculateOrdertime (orderAmount:number, expressShipping = false, currDay = DateTime.now()) {
    const Sunday = 7;
    const Saturday = 6;

    const dt:any = this.product.DeliveryTimes.find((dt:any) => dt.min <= orderAmount && dt.max >= orderAmount)
    if (dt) {
      // make delivery one day faster if expressShipping is enabled
      let idx = expressShipping ? 1 : 0
      // If order is before 12 order will be sent today. Today counts as one of the delivery days
      currDay.hour < 12 ? idx ++ : idx = idx
      while (idx < dt.time) {
        // Don't count weekends as delivery days
        currDay = currDay.plus({ day: 1 })
        if (![Sunday, Saturday].includes(currDay.weekday)) {
          idx ++
        }
      }
      this.deliveryDays = currDay.toLocaleString(DateTime.DATE_FULL)
    } else {
      this.deliveryDays = 'No estimated delivery on this order range'
    }
  }

  constructor() { }

  ngOnInit(): void {
  }

}
