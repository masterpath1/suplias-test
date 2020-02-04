import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor() { }

  fetchBuyerData() {
    return fetch('./assets/data/buyer.json');
  }

  fetchOrderData() {
    return fetch('./assets/data/order.json');
  }

  fetchOrderItemData() {
    return fetch('./assets/data/order_item.json');
  }
}
