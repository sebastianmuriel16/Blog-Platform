export interface ErrorResponse {
  status: number;
  message: string;
  details: string;
  errors?: Record<string, string>;
}
