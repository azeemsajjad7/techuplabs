import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'app-pin',
  templateUrl: './pin.component.html',
  styleUrls: ['./pin.component.scss'],
})
export class PinComponent implements OnInit {
  form: FormGroup | undefined;
  collaborators: any;
  uploader: FileUploader | undefined;

  public hasBaseDropZoneOver: boolean = false;
  public hasAnotherDropZoneOver: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<PinComponent>,
    private _formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    const collaboratorsData = localStorage.getItem('customer');

    if (collaboratorsData) this.collaborators = JSON.parse(collaboratorsData);
    else this.collaborators = [];

    this.form = this._formBuilder.group({
      title: [null, Validators.required],
      image: [null, Validators.required],
      collaborators: [null, Validators.required],
      privacy: ['public'],
    });
  }

  onSubmit() {
    this.dialogRef.close(this.form?.value);
  }

  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  fileOverAnother(e: any): void {
    this.hasAnotherDropZoneOver = e;
  }

  file: File | undefined;
  fileName: string = '';

  onFileSelected(files: File[]): void {
    this.file = files[0];
    this.fileName = this.file.name;

    this.readBase64(this.file)
      .then((data: any) => {
        console.log('Base64 data:', data);
        this.form?.get('image')?.setValue(data);
      })
      .catch((error: any) => {
        console.error('Error reading file as Base64:', error);
      });
  }

  readBase64(file: any): Promise<any> {
    var reader = new FileReader();
    var future = new Promise((resolve, reject) => {
      reader.addEventListener(
        'load',
        function () {
          resolve(reader.result);
        },
        false
      );

      reader.addEventListener(
        'error',
        function (event) {
          reject(event);
        },
        false
      );

      reader.readAsDataURL(file);
    });
    return future;
  }
}
