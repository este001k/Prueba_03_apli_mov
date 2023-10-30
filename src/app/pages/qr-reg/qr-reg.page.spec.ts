import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QrRegPage } from './qr-reg.page';

describe('QrRegPage', () => {
  let component: QrRegPage;
  let fixture: ComponentFixture<QrRegPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(QrRegPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
