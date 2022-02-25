import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartItenList: any = [];
  productList = new BehaviorSubject<any>([]);
  search = new BehaviorSubject<string>('');
  constructor() {}
  getProducts() {
    return this.productList.asObservable();
  }
  setProducts(product: any) {
    this.cartItenList.push(...product);
    this.productList.next(product);
  }
  addToCard(product: any) {
    this.cartItenList.push(product);
    this.productList.next(this.cartItenList); // و اضافة االمنتجاتملف الاضافة لتكوين المعادله
    this.getTotalPrice();
    console.log(this.cartItenList);
  }
  getTotalPrice() {
    let grandTotal = 0;
    this.cartItenList.map((a: any) => {
      grandTotal += a.total; //اضافة نتيجة التوتال فقط
    });
    return grandTotal;
  }
  removeCartItem(product: any) {
    this.cartItenList.map((a: any, index: any) => {
      if (product.id === a.id) {
        this.cartItenList.splice(index, 1);
      }
    });
    this.productList.next(this.cartItenList);
  }
  removeAllCard() {
    this.cartItenList = [];
    this.productList.next(this.cartItenList);
  }
}
