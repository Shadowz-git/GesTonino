import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor() { }

  private activeComponentSubject = new BehaviorSubject<string>('dashboard');
  activeComponent$ = this.activeComponentSubject.asObservable();

  setActiveComponent(component: string) {
    this.activeComponentSubject.next(component);
  }
}
