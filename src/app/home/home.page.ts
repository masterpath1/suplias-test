import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import * as moment from 'moment';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public name: string;
  public orderCount: any;
  public person: string;
  public phone: string;
  public storeType: string;
  public address: string;
  public orderItemCount: any;
  public orderItems: any;
  public orders: any;

  constructor(private appService: ApiService,) {}

  getBuyerData() {
    this.appService.fetchBuyerData().then(res => res.json())
    .then(json => {
      this.updateBuyerData(json.data);
    });
  }

  updateBuyerData(data: any) {
    this.name = data.name;
    this.person = data.person;
    this.phone = data.phone;
    this.storeType = data.store_type.name;
    this.address = data.address;
  }

  getOrderData() {
    this.appService.fetchOrderData().then(res => res.json())
    .then(json => {
      this.updateOrderData(json.data);
    });
  }

  updateOrderData(data: any) {
    this.orderCount = data.data.length;
    this.orders = data.data;
  }

  getOrderItemData() {
    this.appService.fetchOrderItemData().then(res => res.json())
    .then(json => {
      this.updateOrderItemData(json.data);
    });
  }

  updateOrderItemData(data: any) {
    this.orderItemCount = data.length;
    this.orderItems = data;
  }

  getExactOrderItems(id: any) {
    let items = [];
    for(let item of this.orderItems) {
      if(item.order_id == id) {
        items.push(item);
      }
    }
    return items;
  }

  formatDate(date: any) {
    return moment.unix(date).format("MMM D, YYYY");
  } 

  checkStatus(status: any) {
    return status == 'pending' ? 'badge-warning' : 'badge-success';
  }

  checkCompleteStatus(order: any) {
    return order.tag == 'completed';
  }

  getProductImage(image: any) {
    return '../assets/img/'+image;
  }

  ngOnInit () {
    this.getBuyerData();
    this.getOrderItemData();
    this.getOrderData();
  }
}
