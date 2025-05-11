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

  toggleMenu(): void {
    this.isCollapsed = !this.isCollapsed;
  }
  
  closeMenu(): void {
    const focused = document.activeElement as HTMLElement;
    const menu = document.getElementById('navbarNav');
  
    if (menu?.contains(focused)) {
      focused.blur(); // Remove o foco de qualquer item dentro do menu
    }
  
    this.isCollapsed = true;
  }
  
}
