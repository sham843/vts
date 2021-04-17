import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreakdownListDialogComponent } from './breakdown-list-dialog.component';

describe('BreakdownListDialogComponent', () => {
  let component: BreakdownListDialogComponent;
  let fixture: ComponentFixture<BreakdownListDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BreakdownListDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BreakdownListDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
