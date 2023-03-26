import { retry, RetryConfig } from 'rxjs';

export const httpRetry = <T>(config?: RetryConfig) => retry<T>({ count: 3, delay: 1000, ...config });
