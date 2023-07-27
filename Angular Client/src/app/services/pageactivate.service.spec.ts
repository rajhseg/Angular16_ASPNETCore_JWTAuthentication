import { TestBed } from '@angular/core/testing';

import { PageactivateService } from './pageactivate.service';

describe('PageactivateService', () => {
  let service: PageactivateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PageactivateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
