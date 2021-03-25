import { TestBed } from '@angular/core/testing';

import { CreditcardService } from './creditcard.service';

describe('CreditcardService', () => {
  let service: CreditcardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreditcardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
