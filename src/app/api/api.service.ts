import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
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

  async getUnits() {
    let data = await lastValueFrom(this.http.get<any>(this.baseurl + 'api/Unit'))

    return data
  }

  saveUnits(unitName:string) {
    return this.http.post<any>(this.baseurl + 'api/Unit', { "UnitName": unitName })
  }

  saveProduct(productName:string, unitId: number) {
    return this.http.post<any>(this.baseurl + 'api/Product', { "ProductName": productName, "UnitId": unitId })
  }

  deleteProduct(productId:number) {
    return this.http.delete<any>(this.baseurl + 'api/Product/' + productId)
  }

  saveDeliveryTime(min: number, max: number, time: number, productId: number) {
    return this.http.post<any>(this.baseurl + 'api/DeliveryTimes', { "min": min, "max": max, "time": time, "productId": productId })
  }
  updateDeliveryTime(id: number, min: number, max: number, time: number, productId: number) {
    return this.http.put<any>(this.baseurl + 'api/DeliveryTimes/' + id, { "min": min, "max": max, "time": time, "productId": productId })
  }

}
