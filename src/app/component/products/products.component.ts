import { CartService } from './../../service/cart.service';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  productlist: any[] = [];
  searchKey: string = '';
  filterCategory: any;
  constructor(private api: ApiService, private cartService: CartService) {}

  ngOnInit(): void {
    this.api.getProduct().subscribe((res) => {
      this.productlist = res;
      this.filterCategory = res;
      this.productlist.forEach((a: any) => {
        if (
          a.category === "women's clothing" ||
          a.category === "man's clothing"
        ) {
          a.category = 'fashion';
        }
        Object.assign(a, { quantity: 1, total: a.price });
      });
    });
    this.cartService.search.subscribe((res: any) => {
      this.searchKey = res;
    });
  }
  addToCard(item: any) {
    this.cartService.addToCard(item);
  }
  filter(category: any) {
    this.filterCategory = this.productlist.filter((a: any) => {
      if (a.category == category || category == '') {
        return a;
      }
    });
  }
}
