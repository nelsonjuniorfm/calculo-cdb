import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vi } from 'vitest';

import { CdbCalculatorFormComponent } from './cdb-calculator-form';

describe('CdbCalculatorFormComponent', () => {
  let fixture: ComponentFixture<CdbCalculatorFormComponent>;
  let component: CdbCalculatorFormComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CdbCalculatorFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CdbCalculatorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should require a positive amount', () => {
    component.form.setValue({ initialAmount: 0, months: 12 });

    expect(component.form.valid).toBeFalsy();
    expect(component.form.controls.initialAmount.hasError('min')).toBeTruthy();
  });

  it('should require at least two months', () => {
    component.form.setValue({ initialAmount: 1000, months: 1 });

    expect(component.form.valid).toBeFalsy();
    expect(component.form.controls.months.hasError('min')).toBeTruthy();
  });

  it('should emit a valid calculation request', () => {
    const emitSpy = vi.spyOn(component.calculate, 'emit');
    component.form.setValue({ initialAmount: 1000, months: 12 });

    component.submit();

    expect(emitSpy).toHaveBeenCalledWith({ initialAmount: 1000, months: 12 });
  });
});
