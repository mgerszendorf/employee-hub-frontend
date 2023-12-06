import { AxiosError } from 'axios';

export type ErrorResponse = AxiosError<{ status: number; errors: string[] }>;
