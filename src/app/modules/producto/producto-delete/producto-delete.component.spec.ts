import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoDeleteComponent } from './producto-delete.component';

describe('ProductoDeleteComponent', () => {
  let component: ProductoDeleteComponent;
  let fixture: ComponentFixture<ProductoDeleteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductoDeleteComponent]
    });
    fixture = TestBed.createComponent(ProductoDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
