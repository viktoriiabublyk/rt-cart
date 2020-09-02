import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { CleanByIndex } from '../messages.actions';
import { MessagesState } from '../messages.state';
import { Observable } from 'rxjs';


@Component({
  // tslint:disable-next-line:component-selector
  selector: 'rt-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlertComponent implements OnInit {

  constructor(private store: Store) { }
  @Select(MessagesState.getMessages) messages$: Observable<any>;

  ngOnInit() {
  }

  clear(index) {
    this.store.dispatch(new CleanByIndex(index));
  }

  trackByFn(index) {
    return index;
  }
}
