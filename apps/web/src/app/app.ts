import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { Component, DestroyRef, inject, LOCALE_ID, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize } from 'rxjs';

import { CdbCalculatorFormComponent } from './components/cdb-calculator-form/cdb-calculator-form';
import { CdbResultComponent } from './components/cdb-result/cdb-result';
import { ServerStatus, ServerStatusComponent } from './components/server-status/server-status';
import { CdbCalculationRequest, CdbCalculationResponse } from './models/cdb-calculation';
import { CdbService } from './services/cdb.service';

registerLocaleData(localePt);

@Component({
  selector: 'app-root',
  imports: [CdbCalculatorFormComponent, CdbResultComponent, ServerStatusComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
  providers: [{ provide: LOCALE_ID, useValue: 'pt-BR' }],
})
export class App implements OnInit {
  private readonly cdbService = inject(CdbService);
  private readonly destroyRef = inject(DestroyRef);

  readonly serverStatus = signal<ServerStatus>('checking');
  readonly submittedRequest = signal<CdbCalculationRequest | null>(null);
  readonly calculationResult = signal<CdbCalculationResponse | null>(null);
  readonly errorMessage = signal<string | null>(null);
  readonly isCalculating = signal(false);

  ngOnInit(): void {
    this.cdbService
      .checkHealth()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => this.serverStatus.set('online'),
        error: () => this.serverStatus.set('offline'),
      });
  }

  calculate(request: CdbCalculationRequest): void {
    this.errorMessage.set(null);
    this.calculationResult.set(null);
    this.submittedRequest.set(request);
    this.isCalculating.set(true);

    this.cdbService
      .calculate(request)
      .pipe(
        finalize(() => this.isCalculating.set(false)),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe({
        next: (result) => this.calculationResult.set(result),
        error: (error: Error) => {
          this.calculationResult.set(null);
          this.errorMessage.set(error.message);
        },
      });
  }

  clearResult(): void {
    this.calculationResult.set(null);
    this.submittedRequest.set(null);
    this.errorMessage.set(null);
  }
}
