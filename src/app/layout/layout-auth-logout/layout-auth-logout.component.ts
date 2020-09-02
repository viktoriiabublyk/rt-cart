import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-layout-auth-logout',
  templateUrl: './layout-auth-logout.component.html',
  styleUrls: ['./layout-auth-logout.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutAuthLogoutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
