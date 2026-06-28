import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { Mock, vi } from 'vitest';

import { App } from './app';
import { CdbService } from './services/cdb.service';

describe('App', () => {
  let cdbService: {
    checkHealth: Mock;
    calculate: Mock;
  };

  beforeEach(async () => {
    cdbService = {
      checkHealth: vi.fn(),
      calculate: vi.fn(),
    };
    cdbService.checkHealth.mockReturnValue(of({ status: 'Healthy' }));

    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: CdbService, useValue: cdbService as Partial<CdbService> },
      ],
    }).compileComponents();
  });

  it('should render the calculator title', async () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    await fixture.whenStable();

    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('h1')?.textContent).toContain('Calculadora de rendimento CDB');
  });

  it('should check the server health when the screen opens', () => {
    const fixture = TestBed.createComponent(App);

    fixture.detectChanges();

    expect(cdbService.checkHealth).toHaveBeenCalled();
    expect(fixture.componentInstance.serverStatus()).toBe('online');
  });

  it('should show gross and net results after calculation', () => {
    cdbService.calculate.mockReturnValue(of({ grossAmount: 1123.08, netAmount: 1098.47 }));
    const fixture = TestBed.createComponent(App);

    fixture.detectChanges();
    fixture.componentInstance.calculate({ initialAmount: 1000, months: 12 });
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    expect(cdbService.calculate).toHaveBeenCalledWith({ initialAmount: 1000, months: 12 });
    expect(compiled.textContent).toContain('Resultado bruto');
    expect(compiled.textContent).toContain('Resultado liquido');
  });

  it('should show backend error messages', () => {
    cdbService.calculate.mockReturnValue(throwError(() => new Error('O prazo deve ser de pelo menos 2 meses.')));
    const fixture = TestBed.createComponent(App);

    fixture.detectChanges();
    fixture.componentInstance.calculate({ initialAmount: 1000, months: 1 });
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('O prazo deve ser de pelo menos 2 meses.');
    expect(fixture.componentInstance.calculationResult()).toBeNull();
  });
});
