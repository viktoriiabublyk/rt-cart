import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { loadContent } from './../../app.animations';

@Component({
  selector: 'app-layout-checkout-confirmation-wrap',
  templateUrl: './layout-checkout-confirmation-wrap.component.html',
  styleUrls: ['./layout-checkout-confirmation-wrap.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    loadContent,
  ],
})
export class LayoutCheckoutConfirmationWrapComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
