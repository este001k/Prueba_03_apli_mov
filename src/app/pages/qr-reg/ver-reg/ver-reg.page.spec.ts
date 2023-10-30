import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VerRegPage } from './ver-reg.page';

describe('VerRegPage', () => {
  let component: VerRegPage;
  let fixture: ComponentFixture<VerRegPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(VerRegPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
