import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { authenticationGisGuard } from './authentication-gis.guard';

describe('authenticationGisGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => authenticationGisGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
