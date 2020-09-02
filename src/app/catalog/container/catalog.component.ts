import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngxs/store';
import { RemoveCurrentCategory } from '../state/category.action';
import { loadContent } from '../../app.animations';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css'],
  animations: [
    loadContent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CatalogComponent implements OnInit, OnDestroy {

  constructor(private store: Store) {}
  ngOnInit() {

  }
  ngOnDestroy() {
    this.store.dispatch(
      new RemoveCurrentCategory(),
    );
  }

}
