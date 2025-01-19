import { Component } from '@angular/core';
import {NotificationService, Notification} from '../services/notification.service';
import {NgClass, NgForOf} from '@angular/common';

@Component({
  selector: 'app-notification',
  imports: [
    NgClass,
    NgForOf
  ],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css'
})
export class NotificationComponent {
  notifications: Notification[] = [];

  constructor(private notificationService: NotificationService) {
    this.notificationService.notifications$.subscribe((notifications) => {
      this.notifications = notifications;
    });
  }

  removeNotification(id?: string): void {
    if (!id) return;
    this.notificationService.removeNotification(id);
  }

  notificationClasses(type: string): string {
    switch (type) {
      case 'success':
        return 'bg-green-500 text-white';
      case 'error':
        return 'bg-red-500 text-white';
      case 'info':
        return 'bg-blue-500 text-white';
      case 'warning':
        return 'bg-yellow-500 text-black';
      default:
        return 'bg-gray-500 text-white';
    }
  }

  notificationIcon(type: string): string {
    switch (type) {
      case 'success':
        return '✔️';
      case 'error':
        return '❌';
      case 'info':
        return 'ℹ️';
      case 'warning':
        return '⚠️';
      default:
        return '🔔';
    }
  }
}
