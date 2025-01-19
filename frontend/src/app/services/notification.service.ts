import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

export interface Notification {
  id?: string;
  title: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
}

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private notificationsSubject = new BehaviorSubject<Notification[]>([]);
  notifications$ = this.notificationsSubject.asObservable();

  private notifications: Notification[] = [];
  private readonly MAX_NOTIFICATIONS = 5; // Limite massimo di notifiche visualizzabili

  constructor() {}

  addNotification(notification: Notification): void {
    const id = notification.id || this.generateId();

    this.notifications.push({ ...notification, id });

    // Se il numero di notifiche supera il limite, rimuovi la più vecchia
    if (this.notifications.length >= this.MAX_NOTIFICATIONS) {
      this.notifications.shift();
    }

    this.notificationsSubject.next(this.notifications);

    // Rimuovi la notifica automaticamente dopo 5 secondi
    setTimeout(() => this.removeNotification(id), 5000);
  }

  removeNotification(id: string): void {
    this.notifications = this.notifications.filter((n) => n.id !== id);
    this.notificationsSubject.next(this.notifications);
  }

  private generateId(): string {
    return Math.random().toString(36).substring(2, 15);
  }
}
