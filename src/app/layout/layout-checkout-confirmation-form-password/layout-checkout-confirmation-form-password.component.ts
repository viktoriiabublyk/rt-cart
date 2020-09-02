import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { trigger, state, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-layout-checkout-confirmation-form-password',
  templateUrl: './layout-checkout-confirmation-form-password.component.html',
  styleUrls: ['./layout-checkout-confirmation-form-password.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('control', [
      state('visible', style({
        display: 'block',
        transform: '*',
      })),
      state('hidden', style({
        display: 'none',
        transform: 'translateX(50%)',
      })),
      transition('visible => hidden', [animate(0)]),
      transition('hidden => visible', [animate(200)]),
    ])
  ],
})
export class LayoutCheckoutConfirmationFormPasswordComponent implements OnInit {

  @Input() checked;

  constructor() { }

  ngOnInit(): void {
  }

}
