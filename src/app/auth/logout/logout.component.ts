import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngxs/store';
import { Logout } from '../auth.actions';
import {Settings} from '../../../conf/settings';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LogoutComponent implements OnInit {

  constructor(private store: Store,
              private settings: Settings,
              private title: Title,
  ) { }

  ngOnInit() {
    this.title.setTitle(this.settings.formatTitle('Logout'));
    this.store.dispatch(new Logout());
  }

}
