import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { EpisodioModel } from '../models/episodio.model';

import { RickandmortyService } from '../services/rickandmorty.service';

describe('RickandmortyService', () => {
  let service: RickandmortyService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        RickandmortyService,
        provideHttpClient(),
        provideHttpClientTesting(), // Mock para peticiones HTTP
      ],
    });

    service = TestBed.inject(RickandmortyService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  // Verificamos que no queden peticiones pendientes después de cada test
  afterEach(() => {
    httpMock.verify();
  });

  it('debe crearse correctamente', () => {
    expect(service).toBeTruthy();
  });

  it('debe obtener la lista de productos (GET)', () => {
    const mockProducts = [
      {
        "id": 1,
        "name": "Pilot",
        "air_date": "December 2, 2013",
        "episode": "S01E01",
        "characters": [
            "https://rickandmortyapi.com/api/character/1",
        ],
        "url": "https://rickandmortyapi.com/api/episode/1",
        "created": new Date("2017-11-10T12:56:33.798Z")
      },
      {
        "id": 2,
        "name": "Pilot 2",
        "air_date": "December 2, 2013",
        "episode": "S01E01",
        "characters": [
            "https://rickandmortyapi.com/api/character/1",
        ],
        "url": "https://rickandmortyapi.com/api/episode/1",
        "created": new Date("2017-11-10T12:56:33.798Z")
      },
      { id: 2, name: 'Producto B' }
    ] as EpisodioModel[];

    service.getEpisodios().subscribe((episodios) => {
      expect(episodios.results.length).toBe(2);
      expect(episodios).toEqual(mockProducts);
    });

    // Validamos la URL y el método
    const req = httpMock.expectOne('https://ejemplo.com');
    expect(req.request.method).toBe('GET');

    // Enviamos la data simulada
    req.flush(mockProducts);
  });

  it('debe manejar errores al buscar un producto inexistente', () => {
    const errorMessage = '404 error';

    service.getEpisodio(99).subscribe({
      next: () => fail('debería haber fallado'),
      error: (error) => {
        expect(error.status).toBe(404);
      }
    });

    const req = httpMock.expectOne('https://ejemplo.com/99');
    req.flush(errorMessage, { status: 404, statusText: 'Not Found' });
  });
});
