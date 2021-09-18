import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarAddressComponent } from './sidebar-address.component';

describe('SidebarAddressComponent', () => {
  let component: SidebarAddressComponent;
  let fixture: ComponentFixture<SidebarAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarAddressComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
