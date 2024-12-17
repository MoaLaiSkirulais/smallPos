import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalalogComponent } from './catalog.component';

describe('CatalalogComponent', () => {
  let component: CatalalogComponent;
  let fixture: ComponentFixture<CatalalogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatalalogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatalalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
