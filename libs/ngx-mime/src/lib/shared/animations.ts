import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { ViewerOptions } from './../core/models/viewer-options';

export const slideInLeft = trigger('slideInLeft', [
  state(
    'hide',
    style({
      transform: 'translate(-100%, 0)',
      display: 'none',
    }),
  ),
  state(
    'show',
    style({
      transform: 'translate(0px, 0px)',
      display: 'block',
    }),
  ),
  transition(
    'hide => show',
    animate(`${ViewerOptions.transitions.toolbarsEaseInTime}ms ease-out`),
  ),
  transition(
    'show => hide',
    animate(`${ViewerOptions.transitions.toolbarsEaseOutTime}ms ease-in`),
  ),
]);

export const rotate45 = trigger('rotate45', [
  transition('closed => open', [
    style({ transform: 'rotate(-45deg)', opacity: 0 }),
    animate(`100ms`),
  ]),
  transition('open => closed', [
    style({ transform: 'rotate(45deg)', opacity: 0 }),
    animate(`100ms`),
  ]),
]);
