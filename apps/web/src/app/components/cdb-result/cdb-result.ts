import { CurrencyPipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

import { CdbCalculationRequest, CdbCalculationResponse } from '../../models/cdb-calculation';

@Component({
  selector: 'app-cdb-result',
  imports: [CurrencyPipe, MatCardModule],
  templateUrl: './cdb-result.html',
  styleUrl: './cdb-result.css',
})
export class CdbResultComponent {
  readonly request = input.required<CdbCalculationRequest>();
  readonly result = input.required<CdbCalculationResponse>();
}
