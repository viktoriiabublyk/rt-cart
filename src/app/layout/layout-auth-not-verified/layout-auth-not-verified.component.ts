import { Component, OnInit, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-layout-auth-not-verified',
  templateUrl: './layout-auth-not-verified.component.html',
  styleUrls: ['./layout-auth-not-verified.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutAuthNotVerifiedComponent implements OnInit {

  @Output()
  sendEmail: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  sendEmailForVerified(){
    this.sendEmail.emit();
  }
}

