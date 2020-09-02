import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Product, ProductListResponse } from '../../models/product.model';
import {loadImage} from '../../../app.animations';
import {Settings} from '../../../../conf/settings';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  animations: [loadImage],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductComponent implements OnInit {
  rating: number;
  // imageLoaded = false;
  @Input() item: Product;

  constructor(
    public settings: Settings,
    ) { }

  ngOnInit() {
    this.rating = this.item.rating;
  }

  // show(e) {
  //   this.imageLoaded = true;
  // }

}
