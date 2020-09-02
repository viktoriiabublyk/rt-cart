import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';

@Component ({
    selector: 'app-layout-basket-totals-wrapper',
    templateUrl: './layout-basket-totals-wrapper.component.html',
    styleUrls: ['./layout-basket-totals-wrapper.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})


export class LayoutBasketTotalsWrapperComponent implements OnInit{
    constructor() {}

    ngOnInit(): void {
    }
}
