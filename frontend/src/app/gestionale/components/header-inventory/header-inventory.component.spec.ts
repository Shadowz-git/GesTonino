import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderInventoryComponent } from './header-inventory.component';

describe('HeaderInventoryComponent', () => {
  let component: HeaderInventoryComponent;
  let fixture: ComponentFixture<HeaderInventoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderInventoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
