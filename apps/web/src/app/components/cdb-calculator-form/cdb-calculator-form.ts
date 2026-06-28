import { Component, DestroyRef, inject, input, output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { CdbCalculationRequest } from '../../models/cdb-calculation';

@Component({
  selector: 'app-cdb-calculator-form',
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
  ],
  templateUrl: './cdb-calculator-form.html',
  styleUrl: './cdb-calculator-form.css',
})
export class CdbCalculatorFormComponent {
  private readonly destroyRef = inject(DestroyRef);

  readonly isLoading = input(false);
  readonly calculate = output<CdbCalculationRequest>();
  readonly formChanged = output<void>();

  readonly form = new FormGroup({
    initialAmount: new FormControl<number | null>(null, [Validators.required, Validators.min(0.01)]),
    months: new FormControl<number | null>(null, [
      Validators.required,
      Validators.min(2),
      Validators.pattern(/^\d+$/),
    ]),
  });

  constructor() {
    this.form.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => this.formChanged.emit());
  }

  submit(): void {
    if (this.form.invalid || this.isLoading()) {
      this.form.markAllAsTouched();
      return;
    }

    const { initialAmount, months } = this.form.getRawValue();

    if (initialAmount === null || months === null) {
      return;
    }

    this.calculate.emit({
      initialAmount,
      months,
    });
  }

  hasInitialAmountError(error: string): boolean {
    const control = this.form.controls.initialAmount;
    return control.hasError(error) && (control.dirty || control.touched);
  }

  hasMonthsError(error: string): boolean {
    const control = this.form.controls.months;
    return control.hasError(error) && (control.dirty || control.touched);
  }
}
