import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {loadContent} from '../../app.animations';

@Component({
  selector: 'app-layout-auth-registration-wrapper',
  templateUrl: './layout-auth-registration-wrapper.component.html',
  styleUrls: ['./layout-auth-registration-wrapper.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [loadContent],
})
export class LayoutAuthRegistrationWrapperComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
