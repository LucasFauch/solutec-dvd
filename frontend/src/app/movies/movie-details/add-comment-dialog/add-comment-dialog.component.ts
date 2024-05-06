import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-add-comment-dialog',
  standalone: true,
  imports: [
    MatButtonModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
  ],
  templateUrl: './add-comment-dialog.component.html',
  styleUrl: './add-comment-dialog.component.scss',
})
export class AddCommentDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<AddCommentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }
}
