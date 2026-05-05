import { Component, Input, output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-sin-resultado',
  imports: [MatIconModule, MatCardModule ],
  templateUrl: './sin-resultado.html',
  styleUrl: './sin-resultado.css',
})
export class SinResultado {

  @Input("titulo") titulo = ""
  @Input("subTitulo") subTitulo = ""
  onAction = output<string>(); 

  onRetry(){
    this.onAction.emit("");
  }
}
