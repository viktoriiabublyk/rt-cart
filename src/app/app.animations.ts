import {
  animation, trigger, animateChild, group,
  transition, animate, style, query, state
} from '@angular/animations';

export const loadContent =
  trigger('loadContent', [
    state('open', style({
      width: '100%',
      height: '100%',
      opacity: 1,
    })),
    transition('* => open', [
      style({ opacity: 0.3 }),
      animate('450ms ease-in', style({
        opacity: 0.8
      }))
    ]),
  ]);
export const loading =
 trigger('loading', [
    state('void', style({
      opacity: 0
    })),
    transition('void => *', animate('450ms 0.1s ease-in')),
  ]);
export const dropItem =
  trigger('dropItem', [
    state('in', style({ height: '*' })),
    transition('* => void', [
      style({
        height: '90%',
        opacity: 0.5
      }),
      animate('0.4s 0.05s',
        style({
          height: 0,
          opacity: 0.3
        })),
    ]),
  ]);
export const loadStatic =
  trigger('loadStatic', [
    state('in', style({ transform: 'translateY(0)' })),
    transition('void => *', [
      style({ transform: 'translateY(-10%)' }),
      animate('300ms ease-in')
    ])
  ]);
export const loadImage =
  trigger(
    'load', [
      state('loaded', style({
        opacity: 1,
      })),
      state('pending', style({
        opacity: 0,
      })),
      transition('pending => loaded', [animate('0.01s')]),
  ]);
