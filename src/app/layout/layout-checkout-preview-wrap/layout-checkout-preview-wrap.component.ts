import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { loadContent } from '../../app.animations';

@Component({
  selector: 'app-layout-checkout-preview-wrap',
  templateUrl: './layout-checkout-preview-wrap.component.html',
  styleUrls: ['./layout-checkout-preview-wrap.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    loadContent,
  ]
})
export class LayoutCheckoutPreviewWrapComponent implements OnInit {

  @Input() total;

  constructor() { }

  ngOnInit(): void {
  }

}
