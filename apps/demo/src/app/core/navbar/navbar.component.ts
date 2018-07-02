import { Component, Input, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'demo-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Input() sidenav: MatSidenav;
  public manifestUri: string;

  constructor(private router: Router) {}

  ngOnInit() {}

  toggle() {
    this.sidenav.toggle();
  }

  onSubmit() {
    this.router.navigate(['demo'], {
      queryParams: {
        manifestUri: this.manifestUri
      }
    });
  }
}
