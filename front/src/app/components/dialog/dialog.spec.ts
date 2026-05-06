import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Dialog } from './dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

describe('Dialog', () => {
  let component: Dialog;
  let fixture: ComponentFixture<Dialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Dialog],
      providers: [
        { provide: MatDialogRef, useValue: { close: vi.fn() } },
        {
          provide: MAT_DIALOG_DATA, useValue:
          {
            "id": 1,
            "name": "Pilot",
            "air_date": "December 2, 2013",
            "episode": "S01E01",
            "characters": [
              "https://rickandmortyapi.com/api/character/1",
              "https://rickandmortyapi.com/api/character/2",
            ],
            "url": "https://rickandmortyapi.com/api/episode/1",
            "created": "2017-11-10T12:56:33.798Z"
          }
        } // datos simulados
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Dialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
