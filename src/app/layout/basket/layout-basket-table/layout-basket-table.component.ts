import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';

@Component ({
    selector: 'app-layout-basket-table',
    templateUrl: './layout-basket-table.component.html',
    styleUrls: ['./layout-basket-table.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class LayoutBasketTableComponent implements OnInit{

    constructor() { }

    ngOnInit(): void {
    }
}
