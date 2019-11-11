import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedgamesComponent } from './featuredgames.component';

describe('FeaturedgamesComponent', () => {
  let component: FeaturedgamesComponent;
  let fixture: ComponentFixture<FeaturedgamesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeaturedgamesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeaturedgamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
