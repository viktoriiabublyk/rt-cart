import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-basket-mini',
  templateUrl: './basket-mini.component.html',
  styleUrls: ['./basket-mini.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BasketMiniComponent implements OnInit {
  constructor() { }

  public opened = false;

  ngOnInit() {
  }

}
