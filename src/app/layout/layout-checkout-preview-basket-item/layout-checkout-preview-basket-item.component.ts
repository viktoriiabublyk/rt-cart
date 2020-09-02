import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { dropItem } from '../../app.animations';

@Component({
  selector: 'app-layout-checkout-preview-basket-item',
  templateUrl: './layout-checkout-preview-basket-item.component.html',
  styleUrls: ['./layout-checkout-preview-basket-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    dropItem
  ],
})
export class LayoutCheckoutPreviewBasketItemComponent implements OnInit {

  @Input() item;
  @Input() calcPrice;

  constructor() { }

  ngOnInit(): void {
  }

}
