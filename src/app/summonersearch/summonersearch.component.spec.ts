import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SummonersearchComponent } from './summonersearch.component';

describe('SummonersearchComponent', () => {
  let component: SummonersearchComponent;
  let fixture: ComponentFixture<SummonersearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SummonersearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SummonersearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
