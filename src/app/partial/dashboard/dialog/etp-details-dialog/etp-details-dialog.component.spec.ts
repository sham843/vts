import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtpDetailsDialogComponent } from './etp-details-dialog.component';

describe('EtpDetailsDialogComponent', () => {
  let component: EtpDetailsDialogComponent;
  let fixture: ComponentFixture<EtpDetailsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EtpDetailsDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EtpDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
