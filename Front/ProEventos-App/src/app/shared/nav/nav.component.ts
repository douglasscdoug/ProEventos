import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AccountService } from '@app/services/account.service';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  standalone: true,
  imports: [CommonModule, CollapseModule, BsDropdownModule, RouterLink, RouterLinkActive]
})
export class NavComponent implements OnInit {
  isCollapsed = true;

  constructor(
    private router: Router,
    public accountService: AccountService
  ) { }

  ngOnInit() {
  }

  logout(): void {
    this.accountService.logout();
    this.router.navigateByUrl('/user/login');
  }

  showMenu(): boolean {
    return this.accountService.currentUser$ !== null;
  }

}
