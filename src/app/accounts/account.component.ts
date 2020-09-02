import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {Settings} from '../../conf/settings';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountComponent implements OnInit {

  constructor(
      private settings: Settings,
      private title: Title
  ) { }

  ngOnInit() {
    this.title.setTitle(this.settings.formatTitle('Profile'));
  }

}
