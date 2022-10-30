import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  baseurl:String = 'http://localhost:56536/'
  constructor(private http: HttpClient) { }

  async getProducts() {
    let data = await lastValueFrom(this.http.get<any>(this.baseurl + 'api/Product'))

    return data
  }

  async getDeliveryTimes(productid:number) {
    let data = await lastValueFrom(this.http.get<any>(this.baseurl + 'api/DeliveryTimes/?ProductId=' + productid))

    return data
  }
}
