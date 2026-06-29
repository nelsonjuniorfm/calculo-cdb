import { CurrencyPipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';

import { CdbCalculationRequest, CdbCalculationResponse } from '../../models/cdb-calculation';

@Component({
  selector: 'app-cdb-result',
  imports: [CurrencyPipe, MatCardModule, MatTooltipModule],
  templateUrl: './cdb-result.html',
  styleUrl: './cdb-result.css',
})
export class CdbResultComponent {
  readonly roundingTooltip =
    'Calculamos os juros de cada mes usando todas as casas decimais. O arredondamento para centavos acontece apenas no resultado final, evitando distorcoes acumuladas.';

  readonly request = input.required<CdbCalculationRequest>();
  readonly result = input.required<CdbCalculationResponse>();
}
