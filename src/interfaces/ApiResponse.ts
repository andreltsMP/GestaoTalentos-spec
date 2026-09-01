export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

export interface ProblemDetail {
  type: string;
  title: string;
  status: number;
  detail: string;
  timestamp: string;
  errors?: Record<string, string>;
}
