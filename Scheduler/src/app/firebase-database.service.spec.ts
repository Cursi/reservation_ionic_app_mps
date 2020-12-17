import { TestBed } from '@angular/core/testing';

import { FirebaseDatabaseService } from './firebase-database.service';

describe('FirebaseDatabaseService', () => {
  let service: FirebaseDatabaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirebaseDatabaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
