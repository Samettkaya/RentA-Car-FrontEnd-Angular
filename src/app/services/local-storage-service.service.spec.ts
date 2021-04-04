import { TestBed } from '@angular/core/testing';

import { LocalStorageServiceService } from './local-storage-service.service';

describe('LocalStorageServiceService', () => {
  let service: LocalStorageServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalStorageServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
