import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { environment } from '../../environments/environment';
import { CdbService } from './cdb.service';

describe('CdbService', () => {
  let service: CdbService;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CdbService, provideHttpClient(), provideHttpClientTesting()],
    });

    service = TestBed.inject(CdbService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('should request the server health', () => {
    service.checkHealth().subscribe((response) => {
      expect(response).toEqual({ status: 'Healthy' });
    });

    const request = httpTesting.expectOne(`${environment.apiBaseUrl}/health`);

    expect(request.request.method).toBe('GET');
    request.flush({ status: 'Healthy' });
  });

  it('should post the calculation payload', () => {
    service.calculate({ initialAmount: 1000, months: 12 }).subscribe((response) => {
      expect(response).toEqual({ grossAmount: 1123.08, netAmount: 1098.47 });
    });

    const request = httpTesting.expectOne(`${environment.apiBaseUrl}/api/cdb/calculate`);

    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual({ initialAmount: 1000, months: 12 });
    request.flush({ grossAmount: 1123.08, netAmount: 1098.47 });
  });

  it('should propagate backend validation messages', () => {
    service.calculate({ initialAmount: 1000, months: 1 }).subscribe({
      next: () => {
        throw new Error('Expected calculation to fail.');
      },
      error: (error: Error) => {
        expect(error.message).toBe('O prazo deve ser de pelo menos 2 meses.');
      },
    });

    const request = httpTesting.expectOne(`${environment.apiBaseUrl}/api/cdb/calculate`);
    request.flush({ message: 'O prazo deve ser de pelo menos 2 meses.' }, { status: 400, statusText: 'Bad Request' });
  });
});
