import { Component, OnInit, signal } from '@angular/core';
import { RickandmortyService } from '../../services/rickandmortyService';
import { EpisodioModel } from '../../models/episodio.model';

@Component({
  selector: 'app-episodios',
  imports: [],
  templateUrl: './episodios.html',
  styleUrl: './episodios.css',
})
export class Episodios implements OnInit {


  episodios =  signal<EpisodioModel[]>([])

  constructor(
    private rickandmortingService: RickandmortyService
  ){}

  ngOnInit(): void {
    console.log("****************************")
    this.rickandmortingService.getEpisodios().subscribe({
      next: (data) => {
        this.episodios.set(data.results)
        console.log("this.data", data)
        console.log("this.episodios", this.episodios)
      },
      error: (err) => console.error('Error al cargar datos', err)
    });




    // this.rickandmortingService.getEpisodios().subscribe((response)=>{
    //   console.log("response", response)
    //   this.episodios = response.results
    //   console.log("this.episodios", this.episodios)

    // });
  }
 
  
  verDetalle(id:number){
    console.log("id*********", id)
       this.rickandmortingService.getEpisodio(id).subscribe((response)=>{
      console.log("response", response)
      // this.episodios = response.results
      console.log("****reponse verDetalle",response)

    });
  }
}
