import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { EpisodioModel } from '../models/episodio.model';

import { RickandmortyService } from '../services/rickandmorty.service';
import { GetResponseEpisodioModel } from '../models/get-response.model';

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
    const mockCapitulos = 
      {
        "info": {
          "count": 51,
          "pages": 3,
          "next": "https://rickandmortyapi.com/api/episode?page=2",
          "prev": null
        },
        "results": [
          {
            "id": 1,
            "name": "Pilot",
            "air_date": "December 2, 2013",
            "episode": "S01E01",
            "characters": [
              "https://rickandmortyapi.com/api/character/1",
              "https://rickandmortyapi.com/api/character/2"
            ],
            "url": "https://rickandmortyapi.com/api/episode/1",
            "created": "2017-11-10T12:56:33.798Z"
          },
          {
            "id": 2,
            "name": "Pilot 2",
            "air_date": "December 2, 2013",
            "episode": "S01E01",
            "characters": [
              "https://rickandmortyapi.com/api/character/1",
              "https://rickandmortyapi.com/api/character/2"
            ],
            "url": "https://rickandmortyapi.com/api/episode/1",
            "created": "2017-11-10T12:56:33.798Z"
          }
        ]
      }
    

    service.getEpisodios().subscribe((episodios: GetResponseEpisodioModel) => {
      let cantidadCapitulos = episodios?.results?.length ?? 0
      expect(cantidadCapitulos).toBe(2);
      expect(episodios).toEqual(mockCapitulos);
    });

    // Validamos la URL y el método
    const req = httpMock.expectOne('https://rickandmortyapi.com/api/episode');
    expect(req.request.method).toBe('GET');

    // Enviamos la data simulada
    req.flush(mockCapitulos);
  });

  it('debe manejar errores al buscar un producto inexistente', () => {
    const errorMessage = '404 error';

    service.getEpisodio(99).subscribe({
      next: () => expect.fail('debería haber fallado'),
      error: (error) => {
        expect(error.status).toBe(404);
      }
    });

    const req = httpMock.expectOne('https://rickandmortyapi.com/api/episode/99');
    req.flush(errorMessage, { status: 404, statusText: 'Not Found' });
  });
});
