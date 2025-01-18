import {Component} from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {SettingsDialogComponent} from '../../settings-dialog/settings-dialog.component';
import {NgIf} from '@angular/common';
import {AuthService} from '../../../../services/auth.service';
import {Router, Route} from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [
    RouterLink,
    RouterLinkActive,
    SettingsDialogComponent,
    NgIf
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})

export class SidebarComponent {
  isSettingsOpen = false;

  constructor(private authService:AuthService,
              private router:Router) {
  }

  openSettings() {
    this.isSettingsOpen = true;
  }

  closeSettings() {
    this.isSettingsOpen = false;
  }

  logout(): void {
    this.router.navigate(['/home']);
    this.authService.removeSession();
  }

}
