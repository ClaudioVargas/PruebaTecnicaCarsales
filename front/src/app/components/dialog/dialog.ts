import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { EpisodioModel } from '../../models/episodio.model';

@Component({
  selector: 'app-dialog',
  imports: [MatIconModule, MatDialogModule, MatDividerModule],
  templateUrl: './dialog.html',
  styleUrl: './dialog.css',
})
export class Dialog {
  constructor(
    public dialogRef: MatDialogRef<Dialog>,
    @Inject(MAT_DIALOG_DATA) public data: EpisodioModel) { 
      console.log("Dialog => data =>", data)
    }

  cerrar(): void {
    this.dialogRef.close();
  }
}
