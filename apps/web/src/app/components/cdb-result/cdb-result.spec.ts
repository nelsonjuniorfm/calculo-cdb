import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComponentRef } from '@angular/core';
import { By } from '@angular/platform-browser';
import { MatTooltip } from '@angular/material/tooltip';

import { CdbResultComponent } from './cdb-result';

registerLocaleData(localePt);

describe('CdbResultComponent', () => {
  let fixture: ComponentFixture<CdbResultComponent>;
  let componentRef: ComponentRef<CdbResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CdbResultComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CdbResultComponent);
    componentRef = fixture.componentRef;
    componentRef.setInput('request', { initialAmount: 1000, months: 12 });
    componentRef.setInput('result', { grossAmount: 1123.08, netAmount: 1098.47 });
    fixture.detectChanges();
  });

  it('should render the calculation summary and results', () => {
    const text = (fixture.nativeElement as HTMLElement).textContent;

    expect(text).toContain('Aplicando');
    expect(text).toContain('12 meses');
    expect(text).toContain('Resultado bruto');
    expect(text).toContain('Resultado liquido');
  });

  it('should expose rounding information through an accessible tooltip button', () => {
    const button = (fixture.nativeElement as HTMLElement).querySelector('.info-button');
    const tooltip = fixture.debugElement.query(By.directive(MatTooltip)).injector.get(MatTooltip);

    expect(button?.getAttribute('aria-label')).toBe('Como calculamos seu rendimento?');
    expect(tooltip.message).toContain('arredondamento para centavos acontece apenas no resultado final');
  });
});
