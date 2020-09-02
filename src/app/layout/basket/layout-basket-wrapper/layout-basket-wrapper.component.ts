import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {loadContent} from '../../../app.animations';

@Component ({
    selector: 'app-layout-basket-wrapper',
    templateUrl: './layout-basket-wrapper.component.html',
    styleUrls: ['./layout-basket-wrapper.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [
        loadContent,
    ]
})

export class LayoutBasketWrapperComponent implements OnInit{

    constructor() { }

    ngOnInit(): void {
    }
}
