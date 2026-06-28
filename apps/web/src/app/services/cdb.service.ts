import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

import { environment } from '../../environments/environment';
import {
  ApiErrorResponse,
  CdbCalculationRequest,
  CdbCalculationResponse,
  HealthResponse,
} from '../models/cdb-calculation';

@Injectable({
  providedIn: 'root',
})
export class CdbService {
  private readonly http = inject(HttpClient);
  private readonly apiBaseUrl = environment.apiBaseUrl;

  checkHealth(): Observable<HealthResponse> {
    return this.http
      .get<HealthResponse>(`${this.apiBaseUrl}/health`)
      .pipe(catchError(() => throwError(() => new Error('Servidor inativo.'))));
  }

  calculate(request: CdbCalculationRequest): Observable<CdbCalculationResponse> {
    return this.http
      .post<CdbCalculationResponse>(`${this.apiBaseUrl}/api/cdb/calculate`, request)
      .pipe(catchError((error: HttpErrorResponse) => throwError(() => this.toUserError(error))));
  }

  private toUserError(error: HttpErrorResponse): Error {
    const apiError = error.error as Partial<ApiErrorResponse> | null;

    if (apiError?.message) {
      return new Error(apiError.message);
    }

    if (error.status === 0) {
      return new Error('Nao foi possivel conectar ao servidor.');
    }

    return new Error('Nao foi possivel calcular o rendimento.');
  }
}
