import {Component} from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {SettingsDialogComponent} from '../../settings-dialog/settings-dialog.component';
import {NgIf} from '@angular/common';

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

  openSettings() {
    this.isSettingsOpen = true;
  }

  closeSettings() {
    this.isSettingsOpen = false;
  }

}
