import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {loadContent} from '../../../app.animations';

@Component ({
    selector: 'app-layout-basket-add-wrapper',
    templateUrl: './layout-basket-add-wrapper.component.html',
    styleUrls: ['./layout-basket-add-wrapper.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [
        loadContent,
    ]
})

export class LayoutBasketAddWrapperComponent implements OnInit{

    constructor() {}

    ngOnInit(): void {
    }
}
