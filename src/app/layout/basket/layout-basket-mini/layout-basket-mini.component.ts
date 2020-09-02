import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component ({
    selector: 'app-layout-basket-mini',
    templateUrl: './layout-basket-mini.component.html',
    styleUrls: ['./layout-basket-mini.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class LayoutBasketMiniComponent implements OnInit{

    constructor () {}

    ngOnInit(): void {
    }

}
