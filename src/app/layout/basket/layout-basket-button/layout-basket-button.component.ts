import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component ({
    selector: 'app-layout-basket-button',
    templateUrl: './layout-basket-button.component.html',
    styleUrls: ['./layout-basket-button.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class LayoutBasketButtonComponent implements OnInit{
    constructor() {}
    ngOnInit(): void {
    }
}
