import { Component, OnInit, signal, ViewChild } from '@angular/core';
import { RickandmortyService } from '../../services/rickandmorty.service';
import { EpisodioModel } from '../../models/episodio.model';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialog } from '@angular/material/dialog';
import { Dialog } from '../dialog/dialog';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSort } from '@angular/material/sort';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SinResultado } from './sin-resultado/sin-resultado';

@Component({
  selector: 'app-episodios',
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    SinResultado],
  templateUrl: './episodios.html',
  styleUrl: './episodios.css',
})
export class Episodios implements OnInit {


  // dataSource!: MatTableDataSource<EpisodioModel>;
  dataSource = new MatTableDataSource<EpisodioModel>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  // @ViewChild(MatSort) sort!: MatSort;

  loading = signal<boolean>(false)

  displayedColumns: string[] = ['id', 'name', 'episode', 'actions'];



  toppings = new FormControl();
  temporadas!: string[]

  mensajeError = "";

  error = false
  tituloSinResultados = "No se encontraron resultados"
  subTituloSinResultados = "Parece que no hay datos para mostrar en este momento. Intenta ajustar tus filtros o recargar la página."
  sinResusltadoTabla = "No hay datos para mostrar. Intenta ajustar tus filtros o recargar la página."


  constructor(
    private rickandmortingService: RickandmortyService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    console.log("****************************")
    this.loading.set(true)
    this.rickandmortingService.getEpisodios().subscribe({
      next: (data) => {
        data.results.forEach((el) => {
          el.temporada = el.episode.substring(0, 3)
        })
        this.dataSource = new MatTableDataSource(data.results)
        this.dataSource.paginator = this.paginator
        this.obtenerTemporadas()
        this.definirFiltrosTemporada()
        this.loading.set(false)
        this.mensajeError = "No fue posible cargar datos"
        console.log("this.dataSource", this.dataSource)
      },
      error: (err) => {
        console.error('Error al cargar datos', err)
        this.error = true
          this.tituloSinResultados = "No se pudo cargar la pagina"
          this.subTituloSinResultados = "Intente recargar la pagina o contacte con el administrador"
        this.loading.set(false)
      }
    });
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


  length = 50;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];

  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;

  pageEvent: PageEvent | undefined;

  // handlePageEvent(e: PageEvent) {
  //   this.pageEvent = e;
  //   this.length = e.length;
  //   this.pageSize = e.pageSize;
  //   this.pageIndex = e.pageIndex;
  // }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }


  obtenerTemporadas() {
    // Creamos un nuevo arreglo con las 3 primeras letras
    this.temporadas = Array.from(
      new Set(this.dataSource.data.map(item => item.episode.substring(0, 3)))
    );
    console.log("temporadas", this.temporadas);
  }

  // applyFilter(event: Event) {
  //   console.log("*******************************")
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   console.log("filterValue", filterValue)
  //   this.dataSource.filter = filterValue.trim().toLowerCase();

  //   if (this.dataSource.paginator) {
  //     this.dataSource.paginator.firstPage();
  //   }
  // }
  // onSelectionChange(event: MatSelectChange) {
  //   if (event.value.length > 0) {
  //     this.dataSource.filter = JSON.stringify(event.value);
  //   } else {
  //     this.dataSource.filter = '';
  //     this.dataSource.paginator?.firstPage();
  //   }

  // }

  onSelectionChange(event: MatSelectChange | Event) {
    console.log("onSelectionChange", event, typeof event)
    if (event instanceof KeyboardEvent) {
      console.log("KeyboardEvent")
      const filterValue = (event.target as HTMLInputElement).value;
      console.log("filterValue", filterValue)
      this.dataSource.filter = filterValue.trim().toLowerCase();

      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }
    if (event instanceof MatSelectChange) {
      console.log("MatSelectChange")

      if (event.value.length > 0) {
        this.dataSource.filter = JSON.stringify(event.value);
      } else {
        this.dataSource.filter = '';
        this.dataSource.paginator?.firstPage();
      }
    }
  }


  definirFiltrosTemporada() {
    // 2. Sobrescribir filterPredicate
    this.dataSource.filterPredicate = (data: EpisodioModel, filter: string) => {
      // Si no hay filtros, mostrar todo
      console.log("typeof filter", typeof filter )
      if (!filter) return true;
      if(this.esJSONValido(filter)) {
        const temporadasFiltro = JSON.parse(filter);
        // Retorna true si el episodio coincide con alguna temporada seleccionada
        if (temporadasFiltro) {
          return temporadasFiltro.includes(data.temporada);
        }
      } 
      else {
        return data.id.toString() == filter || 
           data.name.toLowerCase().includes(filter) || 
           data.episode.toLowerCase().includes(filter);
      }
    };
  }

  esJSONValido(str: string) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false; // No es JSON válido
    }
    return true; // Es JSON válido
}
}


