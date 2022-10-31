import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api/api.service';
import Swal from 'sweetalert2';

interface productData {
  ProductId: number;
	ProductName: string;
	UnitName: string;
}

interface unit {
  Id: number;
	UnitName: string;
}
interface DeliveryTimes {
  Id: number,
  min: number,
  max: number,
  time: number,
  productId: number
}


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.sass']
})
export class AdminComponent implements OnInit {
  public productData: productData[];
  public unitData: unit[];
  public deliveryTimes: DeliveryTimes[];
  public newProductUnit: number;
  public newProductName: string;
  public newUnitName: string;
  public newDeliveryTimes: DeliveryTimes = { Id: -1, min: -1, max: -1, time: -1, productId: -1 };
  public newDeliveryTimeProductId: number = 0;
  public editDeliveryTimeProductId: number = 0;

  constructor(private apiService: ApiService) {
    this.productData = [];
    this.unitData = [];
    this.deliveryTimes = [];
    this.newProductUnit = -1;
    this.newProductName = '';
    this.newUnitName = '';
    this.newDeliveryTimeProductId = -1;
    this.editDeliveryTimeProductId = -1;
  }

  async getUnits() {
    const data:any = await this.apiService.getUnits()
    this.unitData = data
  }

  async getProducts() {
    const data:any = await this.apiService.getProducts()

    this.productData = data
  }

  async getDeliveryTimeByProduct(productId:number) {
    const data:any = await this.apiService.getDeliveryTimes(productId)

    this.deliveryTimes = data
  }

  async addUnit(unitName:string) {
    if (unitName === '') {
      Swal.fire(
        'Missing input!',
        '',
        'error'
      )
      return
    }
    this.apiService.saveUnits(unitName).subscribe(() => {
      this.getUnits()
    });  
  }

  async addProduct(productName:string, unitId: number) {
    if (productName === '' || unitId === -1) {
      Swal.fire(
        'Missing input!',
        '',
        'error'
      )
      return
    }
    this.apiService.saveProduct(productName, unitId).subscribe(() => {
      this.getProducts()
    });  
  }

  async removeProduct(productId:number) {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    })
    if (result.isConfirmed) {
      this.apiService.deleteProduct(productId).subscribe(() => {
        this.getProducts()
      })
      Swal.fire(
        'Deleted!',
        'The product has been deleted.',
        'success'
      )
    }
  }

  async addDeliveryTime(min: number, max: number, time: number, productId: number) {
    if (min === -1 || max === -1 || time === -1 || productId === -1) {
      Swal.fire(
        'Missing input!',
        '',
        'error'
      )
      return
    }

    this.apiService.saveDeliveryTime(min, max, time, productId).subscribe(() => {
      this.getDeliveryTimeByProduct(productId)
    });  
  }

  async updateDeliveryTime(Id: number) {
    if (Id === -1) {
      Swal.fire(
        'Missing input!',
        '',
        'error'
      )
      return
    }
    const deliveryTimeToUpdate:any = this.deliveryTimes.find(x => x.Id === Id)
    this.apiService.updateDeliveryTime(deliveryTimeToUpdate.Id, deliveryTimeToUpdate.min, deliveryTimeToUpdate.max, deliveryTimeToUpdate.time, deliveryTimeToUpdate.ProductId).subscribe(() => {
      this.getDeliveryTimeByProduct(deliveryTimeToUpdate.ProductId)
      Swal.fire({
        toast: true,
        icon: 'success',
        title: 'Row has been updated',
        timer: 1500,
        showConfirmButton: false,
      })
    });
  }

  ngOnInit(): void {
    this.getProducts()
    this.getUnits()
  }
}
