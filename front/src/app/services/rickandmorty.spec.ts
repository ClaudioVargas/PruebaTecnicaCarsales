import { TestBed } from '@angular/core/testing';

import { Rickandmorty } from './rickandmorty';

describe('Rickandmorty', () => {
  let service: Rickandmorty;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Rickandmorty);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
