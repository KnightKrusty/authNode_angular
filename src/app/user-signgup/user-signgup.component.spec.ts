import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSigngupComponent } from './user-signgup.component';

describe('UserSigngupComponent', () => {
  let component: UserSigngupComponent;
  let fixture: ComponentFixture<UserSigngupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserSigngupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSigngupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
