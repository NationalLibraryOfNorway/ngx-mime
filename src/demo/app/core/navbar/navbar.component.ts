import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'demo-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {
  @Output() toggleSidenav = new EventEmitter<boolean>();
  public manifestUri: string;

  constructor(private router: Router) { }

  ngOnInit() { }

  toggle() {
    this.toggleSidenav.emit();
  }

  onSubmit() {
    console.log(this.manifestUri);
    this.router.navigate(['demo'], {queryParams: {
      manifestUri: this.manifestUri
    }
  });
}

}
