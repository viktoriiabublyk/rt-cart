import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-layout-auth-login-form',
  templateUrl: './layout-auth-login-form.component.html',
  styleUrls: ['./layout-auth-login-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutAuthLoginFormComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {}

}
