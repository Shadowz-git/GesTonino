import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductResearchComponent } from './product-research.component';

describe('ProductResearchComponent', () => {
  let component: ProductResearchComponent;
  let fixture: ComponentFixture<ProductResearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductResearchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductResearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
