import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { MdSidenav } from '@angular/material';

@Component({
  selector: 'demo-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {
  @Input() sidenav: MdSidenav;
  public manifestUri: string;

  constructor(private router: Router) { }

  ngOnInit() { }

  toggle() {
    this.sidenav.toggle();
  }

  onSubmit() {
    this.router.navigate(['demo'], {queryParams: {
      manifestUri: this.manifestUri
    }
  });
}

}
