import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';

@Component ({
    selector: 'app-layout-basket-totals-table',
    templateUrl: './layout-basket-totals-table.component.html',
    styleUrls: ['./layout-basket-totals-table.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class LayoutBasketTotalsTableComponent implements OnInit {

    constructor() {}

    ngOnInit(): void {
    }
}

