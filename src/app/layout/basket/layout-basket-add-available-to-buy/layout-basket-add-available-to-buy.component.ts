import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';

@Component ({
    selector: 'app-layout-basket-add-available-to-buy',
    templateUrl: './layout-basket-add-available-to-buy.component.html',
    styleUrls: ['./layout-basket-add-available-to-buy.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class LayoutBasketAddAvailableToBuyComponent implements OnInit{
    @Input() data;
    @Input() image;

    constructor() {}

    ngOnInit(): void {
    }
}
