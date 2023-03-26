import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  @Input() public items: Array<{ name: string; activated: boolean; url: string }>;

  constructor(private readonly router: Router, private readonly activateRoute: ActivatedRoute) {}

  ngOnInit(): void {
    return;
  }

  public redirect(url: string) {
    this.router.navigate([`../${url}`], { relativeTo: this.activateRoute });
  }
}
