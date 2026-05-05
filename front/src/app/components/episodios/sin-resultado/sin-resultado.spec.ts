import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SinResultado } from './sin-resultado';

describe('SinResultado', () => {
  let component: SinResultado;
  let fixture: ComponentFixture<SinResultado>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SinResultado],
    }).compileComponents();

    fixture = TestBed.createComponent(SinResultado);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
