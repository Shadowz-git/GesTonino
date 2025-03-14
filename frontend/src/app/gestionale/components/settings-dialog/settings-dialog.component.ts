import { Component, EventEmitter, Output, HostListener, Input, OnDestroy } from '@angular/core';
import { MapComponent } from '../../../map/map.component';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { LocationService } from '../../../services/location.service';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import {MapService} from '../../../services/map.service';
import {NgClass, NgIf} from '@angular/common';
import {SettingsService} from '../../../services/settings.service';
import {NotificationService} from '../../../services/notification.service';
import {AuthService} from '../../../services/auth.service';

@Component({
  selector: 'app-settings-dialog',
  templateUrl: './settings-dialog.component.html',
  styleUrls: ['./settings-dialog.component.css'],
  imports: [
    MapComponent,
    ReactiveFormsModule,
    FormsModule,
    NgClass,
    NgIf
  ]
})
export class SettingsDialogComponent implements OnDestroy {
  @Input() activityAddress: string = '';
  @Input() activityCap: string = '';
  @Input() lat: number = 41.9027835;
  @Input() lng: number = 12.4963655;

  private citySubject = new Subject<string>();

  settingsForm: FormGroup; // FormGroup per il form


  constructor(private locationService: LocationService,
              private settingsService: SettingsService,
              private mapService: MapService,
              private notificationService: NotificationService,
              private authService: AuthService) {
    // Definizione del form con i controlli e la validazione
    this.settingsForm = new FormGroup({
      activityName: new FormControl('', [Validators.required]),
      activityAddress: new FormControl('', [Validators.required]),
      activityCap: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')]),
    });


    this.citySubject.pipe(
      debounceTime(300), // Aspetta 300ms dopo l'ultimo input prima di procedere
      distinctUntilChanged() // Ignora se il valore non è cambiato rispetto all'ultimo
    ).subscribe(newCity => {
      this.locationService.getCoordinatesFromCity(newCity).subscribe({
        next: ({ lat, lng }) => {
          this.mapService.setCenter(lat, lng);
          this.mapService.setZoom(17);
        },
        error: () => {
          // console.error('Errore nel recupero delle coordinate dalla città');
        },
      });
    });
  }

  @Output() close = new EventEmitter<void>();
  @Output() cityChange = new EventEmitter<string>();

  private isClickInsideContent = false;

  onContentMouseDown(): void {
    this.isClickInsideContent = true;
  }

  @HostListener('document:mousedown', ['$event'])
  onDocumentMouseDown(): void {
    if (!this.isClickInsideContent) {
      this.closeModal();
    }
    this.isClickInsideContent = false;
  }

  onCityChange(activityAdr: string, activityCap: string): void {
    this.activityAddress = activityAdr;
    this.activityCap = activityCap;
    if(activityAdr){
      this.citySubject.next(activityAdr+" "+activityCap); // Emetti il nuovo valore nel Subject
    }
  }

  // Metodo per verificare se il form è valido
  isFormValid(): boolean {
    return this.settingsForm.valid;
  }


  onSubmit(): void {
    if (!this.isFormValid()) {
      this.settingsForm.markAllAsTouched();
      return;
    }

    // Raccogli i dati dal form
    const formData = {
      name: this.settingsForm.get('activityName')?.value,
      address: this.settingsForm.get('activityAddress')?.value,
      cap: this.settingsForm.get('activityCap')?.value,
      latitude: this.lat,
      longitude: this.lng,
      user: localStorage.getItem('user_id')
    };

    // Chiamata al servizio per inviare i dati al backend
    this.settingsService.addActivity(formData).subscribe({
      next: (response) => {
        this.authService.setActivity(response.id, response.name);
        this.notificationService.addNotification({
          type: 'success',
          title: 'Operazione completata con successo',
          message: ''
        })
      },
      error: () => {
        // console.error('Errore durante l\'aggiunta dell\'attività:', err);
        this.notificationService.addNotification({
          type: 'error',
          title: 'Errore',
          message: 'Errore durante l\'operazione di aggiunta, riprova.'
        })
      },
    });
    this.closeModal()
  }

  closeModal(): void {
    this.close.emit();
  }



  ngOnDestroy() {
    this.citySubject.complete();
  }


}
