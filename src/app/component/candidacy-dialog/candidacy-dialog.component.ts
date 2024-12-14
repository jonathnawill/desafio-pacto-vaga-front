import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-candidacy-dialog',
  templateUrl: './candidacy-dialog.component.html',
  styleUrls: ['./candidacy-dialog.component.css'],
})
export class CandidacyDialogComponent {
  additionalInfo: string = '';

  constructor(
    public dialogRef: MatDialogRef<CandidacyDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }

  submit(): void {
    this.dialogRef.close(this.additionalInfo);
  }
}
