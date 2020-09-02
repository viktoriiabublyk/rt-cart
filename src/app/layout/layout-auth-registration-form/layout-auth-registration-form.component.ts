import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-layout-auth-registration-form',
  templateUrl: './layout-auth-registration-form.component.html',
  styleUrls: ['./layout-auth-registration-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutAuthRegistrationFormComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
