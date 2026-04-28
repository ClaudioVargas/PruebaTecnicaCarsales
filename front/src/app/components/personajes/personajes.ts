import { Component, OnInit, signal } from '@angular/core';
import { RickandmortyService } from '../../services/rickandmortyService';
import { PersonajeModel } from '../../models/personaje.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-personajes',
  imports: [DatePipe],
  templateUrl: './personajes.html',
  styleUrl: './personajes.css',
})
export class Personajes {


  personajes = signal<PersonajeModel[]>([])

  constructor(
    private rickandmortingService: RickandmortyService
  ){}

  ngOnInit(): void {
    console.log("****************************")
    this.rickandmortingService.getPersonajes().subscribe({
      next: (data) => {
        this.personajes.set(data.results)
      },
      error: (err) => console.error('Error al cargar datos', err)
    });




    // this.rickandmortingService.getPersonajes().subscribe((response)=>{
    //   console.log("response", response)
    //   this.personajes = response.results
    //   console.log("this.episodios", this.personajes)

    // });
  }


}
