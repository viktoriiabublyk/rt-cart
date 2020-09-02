import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';

@Component ({
    selector: 'app-layout-basket-add-b-recommended',
    templateUrl: './layout-basket-add-b-recommended.component.html',
    styleUrls: ['./layout-basket-add-b-recommended.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class LayoutBasketAddBRecommendedComponent implements OnInit{

    @Input() item;
    @Input() settings;
    constructor() {}

    ngOnInit(): void {
    }
}
