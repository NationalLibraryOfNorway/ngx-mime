import { Component, Input } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';

@Component({
  selector: 'demo-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  @Input() sidenav!: MatSidenav;
  public manifestUri = '';

  constructor(private router: Router) {}

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
