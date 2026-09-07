import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'mime-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconComponent {
  readonly iconName = input('');
}
