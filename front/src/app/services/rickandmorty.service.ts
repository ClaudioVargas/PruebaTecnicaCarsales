import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetResponseEpisodioModel, GetResponseModel } from '../models/get-response.model';
import { EpisodioModel } from '../models/episodio.model';

@Injectable({
  providedIn: 'root',
})
export class RickandmortyService {

  
  private http = inject(HttpClient); // Inyección moderna con inject()
  private apiUrl = 'https://rickandmortyapi.com/api';

  getPersonajes(): Observable<GetResponseModel> {
    return this.http.get<GetResponseModel>(this.apiUrl+"/character");
  }
  
  
  getEpisodios(): Observable<GetResponseEpisodioModel> {
    return this.http.get<GetResponseEpisodioModel>(this.apiUrl+"/episode");
  }

  
  getEpisodio(numero: number): Observable<EpisodioModel> {
    return this.http.get<EpisodioModel>(this.apiUrl+"/episode/"+numero);
  }

}
