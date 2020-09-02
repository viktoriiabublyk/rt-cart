import { Component, OnInit, Input, EventEmitter, Output, ChangeDetectionStrategy } from '@angular/core';
import { Category } from '../../models/category.model';
import { Settings } from 'src/conf/settings';
import { Store } from '@ngxs/store';
import { SetCurrentCategory } from '../../state/category.action';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryComponent implements OnInit {

  @Output() nameCategory: EventEmitter<string> = new EventEmitter<string>();
  @Input() category: Category;

  constructor(public settings: Settings, public store: Store ) {  }
  ngOnInit() {

  }
  choiseIdCategory(id) {
  this.store.dispatch(new SetCurrentCategory(id));
  }
  trackByFn(index) {
    return index;
  }
}


