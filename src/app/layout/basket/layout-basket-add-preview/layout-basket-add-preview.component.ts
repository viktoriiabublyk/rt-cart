import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component ({
    selector: 'app-layout-basket-add-preview',
    templateUrl: './layout-basket-add-preview.component.html',
    styleUrls: ['./layout-basket-add-preview.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class LayoutBasketAddPreviewComponent implements OnInit{

    constructor() {}

    ngOnInit(): void {
    }
}
