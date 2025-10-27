import { Component, inject, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
    FormsModule,
    MatFormField,
    MatInput,
    MatButton,
    ThemePickerComponent,
  ],
})
export class NavbarComponent {
  private readonly router = inject(Router);

  @Input() sidenav!: MatSidenav;
  public manifestUri = '';

  toggle() {
    this.sidenav.toggle();
  }

  onSubmit() {
    this.router.navigate(['demo'], {
      queryParams: {
        manifestUri: this.manifestUri,
      },
    });
  }
}
