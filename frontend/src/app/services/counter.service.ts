import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root', // Il servizio è disponibile in tutta l'app
})
export class CounterService {
  constructor() {}


  // Carica il contatore per l'utente corrente
  loadCounter(): number {
    const activityId = localStorage.getItem("activity_id");
    const savedData = localStorage.getItem(`counterData_${activityId}`);
    if (savedData) {
      const { counter, lastUpdateTime } = JSON.parse(savedData);
      const now = new Date().getTime();
      const timeDiff = now - lastUpdateTime;

      // Se sono passate più di 24 ore, resetta il contatore
      if (timeDiff > 24 * 60 * 60 * 1000) {
        this.saveCounter(0);
        return 0;
      }
      return counter;
    }
    return 0; // Se non ci sono dati, parte da 0
  }

  // Salva il contatore per l'utente corrente
  saveCounter(counter: number): void {
    const activityId =localStorage.getItem("activity_id");
    const data = {
      counter: counter,
      lastUpdateTime: new Date().getTime(),
    };
    localStorage.setItem(`counterData_${activityId}`, JSON.stringify(data));
  }

  // Incrementa il contatore
  incrementCounter(): number {
    const currentCounter = this.loadCounter();
    const newCounter = currentCounter + 1;
    this.saveCounter(newCounter);
    return newCounter;
  }

  // Resetta il contatore
  resetCounter(): void {
    this.saveCounter(0);
  }
}
