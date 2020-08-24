import { TestBed } from '@angular/core/testing';

import { ProtectRoutesAppGuard } from './protect-routes-app.guard';

describe('ProtectRoutesAppGuard', () => {
  let guard: ProtectRoutesAppGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ProtectRoutesAppGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
