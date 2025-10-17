import { Component, Input, inject } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIconButton, MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatFormField, MatInput } from '@angular/material/input';
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
  private router = inject(Router);

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
