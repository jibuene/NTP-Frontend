import { Component, OnInit } from '@angular/core';
import { ShopService } from './shop.service';

interface productData {
  ProductId: number;
	ProductName: string;
	UnitName: string;
  DeliveryTimes: Array<{ min: number, max: number, time: number }>[];
}

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  providers: [ ShopService ],
  styleUrls: ['./shop.component.sass']
})

export class ShopComponent implements OnInit {
  public productData: productData[];

  constructor(private shopService: ShopService) {
    this.productData = [];
  }

  async getProducts() {
    const data:any = await this.shopService.getProducts()

    this.productData = data
    data.map(async (product: { ProductId: number; DeliveryTimes: any; }) => {
      const dt:any = await this.shopService.getDeliveryTimes(product.ProductId)
      return product.DeliveryTimes = dt
    });
  }

  ngOnInit(): void {
    this.getProducts()
  }

}
