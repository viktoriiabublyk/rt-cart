import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {loadContent} from '../../app.animations';

@Component({
  selector: 'app-layout-auth-login-wrapper',
  templateUrl: './layout-auth-login-wrapper.component.html',
  styleUrls: ['./layout-auth-login-wrapper.component.css'],
  animations: [
    loadContent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutAuthLoginWrapperComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {}
}
