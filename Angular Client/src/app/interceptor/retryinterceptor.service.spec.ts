import { TestBed } from '@angular/core/testing';

import { RetryinterceptorService } from './retryinterceptor.service';

describe('RetryinterceptorService', () => {
  let service: RetryinterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RetryinterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
