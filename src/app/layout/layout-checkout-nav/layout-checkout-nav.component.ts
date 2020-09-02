import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-layout-checkout-nav',
  templateUrl: './layout-checkout-nav.component.html',
  styleUrls: ['./layout-checkout-nav.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutCheckoutNavComponent implements OnInit {

  @Input() stepWizard;

  constructor() { }

  ngOnInit(): void {
  }

}
