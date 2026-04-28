import { Component, OnInit, signal } from '@angular/core';
import { RickandmortyService } from '../../services/rickandmortyService';
import { EpisodioModel } from '../../models/episodio.model';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialog } from '@angular/material/dialog';
import { Dialog } from '../dialog/dialog';

@Component({
  selector: 'app-episodios',
  imports: [
    MatProgressSpinnerModule],
  templateUrl: './episodios.html',
  styleUrl: './episodios.css',
})
export class Episodios implements OnInit {


  episodios = signal<EpisodioModel[]>([])

  loading = signal<boolean>(false)

  constructor(
    private rickandmortingService: RickandmortyService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    console.log("****************************")
    this.loading.set(true)
    this.rickandmortingService.getEpisodios().subscribe({
      next: (data) => {
        this.episodios.set(data.results)
        // setTimeout(()=>{
        this.loading.set(false)
        // },3000)

        console.log("this.data", data)
        console.log("this.episodios", this.episodios)
      },
      error: (err) => {
        console.error('Error al cargar datos', err)
        this.loading.set(false)
      }
    });




    // this.rickandmortingService.getEpisodios().subscribe((response)=>{
    //   console.log("response", response)
    //   this.episodios = response.results
    //   console.log("this.episodios", this.episodios)

    // });
  }


  verDetalle(id: number) {
    console.log("id*********", id)
    this.rickandmortingService.getEpisodio(id).subscribe((response) => {
      console.log("response", response)
      // this.episodios = response.results
      console.log("****reponse verDetalle", response)
      this.openDialog(response)
      

    });
  }

  openDialog(data: EpisodioModel): void {
    let dialogRef = this.dialog.open(Dialog, {
      width: '30%',
      data,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed => result =>', result);
    });
  }
}
