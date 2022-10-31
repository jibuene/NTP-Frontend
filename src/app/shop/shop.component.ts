import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api/api.service';

interface productData {
  ProductId: number;
	ProductName: string;
	UnitName: string;
  DeliveryTimes: Array<{ min: number, max: number, time: number }>;
}

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  providers: [ ApiService ],
  styleUrls: ['./shop.component.sass']
})

export class ShopComponent implements OnInit {
  public productData: productData[];

  constructor(private apiService: ApiService) {
    this.productData = [];
  }

  async getProducts() {
    const data:any = await this.apiService.getProducts()

    this.productData = data
    data.map(async (product: { ProductId: number; DeliveryTimes: any; }) => {
      const dt:any = await this.apiService.getDeliveryTimes(product.ProductId)
      return product.DeliveryTimes = dt
    });
  }

  ngOnInit(): void {
    this.getProducts()
  }

}
