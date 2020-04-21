import { TestBed } from '@angular/core/testing';

export function injectedStub<S>(service: any): jasmine.SpyObj<S> {
  return TestBed.inject(service) as jasmine.SpyObj<S>;
}
