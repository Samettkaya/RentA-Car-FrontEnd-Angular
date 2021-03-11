import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NaviComponent } from './navi.component';

describe('NavComponent', () => {
  let component: NaviComponent;
  let fixture: ComponentFixture<NaviComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NaviComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NaviComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
