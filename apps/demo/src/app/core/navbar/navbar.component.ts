import { Component, inject, input, signal } from '@angular/core';
import { form, FormField, FormRoot } from '@angular/forms/signals';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatFormField, MatInput } from '@angular/material/input';
import { MatSidenav } from '@angular/material/sidenav';
import { MatToolbar } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { ThemePickerComponent } from './theme-picker/theme-picker.component';

@Component({
  selector: 'demo-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  imports: [
    MatToolbar,
    MatIconButton,
    MatIcon,
    FormField,
    FormRoot,
    MatFormField,
    MatInput,
    MatButton,
    ThemePickerComponent,
  ],
})
export class NavbarComponent {
  private readonly router = inject(Router);

  readonly sidenav = input.required<MatSidenav>();
  readonly manifestModel = signal('');
  readonly manifestForm = form(this.manifestModel, {
    submission: {
      action: async () => this.navigateToManifest(),
    },
  });

  toggle() {
    this.sidenav().toggle();
  }

  private async navigateToManifest(): Promise<void> {
    await this.router.navigate(['demo'], {
      queryParams: {
        manifestUri: this.manifestModel(),
      },
    });
  }
}
