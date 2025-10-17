import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'mime-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class IconComponent {
  @Input() iconName = '';
}
