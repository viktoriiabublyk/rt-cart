import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-layout-auth-confirm-email',
  templateUrl: './layout-auth-confirm-email.component.html',
  styleUrls: ['./layout-auth-confirm-email.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutAuthConfirmEmailComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
