export interface CdbCalculationRequest {
  initialAmount: number;
  months: number;
}

export interface CdbCalculationResponse {
  grossAmount: number;
  netAmount: number;
}

export interface ApiErrorResponse {
  message: string;
}

export interface HealthResponse {
  status: string;
}
