import { Component, OnInit, signal } from '@angular/core';
import { RickandmortyService } from '../../services/rickandmorty.service';
import { PersonajeModel } from '../../models/personaje.model';
import { DatePipe } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-personajes',
  imports: [DatePipe,MatProgressSpinnerModule],
  templateUrl: './personajes.html',
  styleUrl: './personajes.css',
})
export class Personajes {


  personajes = signal<PersonajeModel[]>([])

  loading = signal<boolean>(false)

  constructor(
    private rickandmortingService: RickandmortyService
  ) { }

  ngOnInit(): void {
    this.rickandmortingService.getPersonajes().subscribe({
      next: (data) => {
        this.personajes.set(data.results)
        this.loading.set(false)
      },
      error: (err) => console.error('Error al cargar datos', err)
    });
  }


}
