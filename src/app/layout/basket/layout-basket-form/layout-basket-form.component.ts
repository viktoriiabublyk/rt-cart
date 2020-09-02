import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {dropItem, loadContent} from '../../../app.animations';

@Component ({
    selector: 'app-layout-basket-form',
    templateUrl: './layout-basket-form.component.html',
    styleUrls: ['./layout-basket-form.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [dropItem,
    loadContent]
})

export class LayoutBasketFormComponent implements OnInit{
    constructor() {}

    ngOnInit(): void {
    }
}
