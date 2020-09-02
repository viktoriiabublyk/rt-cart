import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { AuthState } from '../../auth';
import { Observable } from 'rxjs';
import {RemoveCurrentCategory} from "../../catalog/state/category.action";
import {ShowFirst} from "../../catalog/state/product.action";
import {loadStatic} from "../../app.animations";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  animations: [
    loadStatic
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent implements OnInit {

  constructor(private store: Store) { }

  @Select (AuthState.isAuthenticated) isAuthenticated$: Observable<boolean>;

  ngOnInit() {}

  destroyCurrentCat() {
    this.store.dispatch([
      new RemoveCurrentCategory(),
      new ShowFirst()
    ]
    );
  }

}
