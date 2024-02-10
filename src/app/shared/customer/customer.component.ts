import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { PinService } from 'src/services/pins.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss'],
})
export class CustomerComponent implements OnInit {
  form: FormGroup | undefined;
  regions: string[] = [];
  countries: string[] = [];

  constructor(
    public dialogRef: MatDialogRef<CustomerComponent>,
    private pinService: PinService,
    private _formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      name: [null, Validators.required],
      email: [null, Validators.required],
      region: [null, Validators.required],
      country: [null, Validators.required],
    });

    this.form.get('region')?.valueChanges.subscribe((val) => {
      this.pinService.getCountry(val).subscribe((res) => {
        this.countries = res;
      });
    });

    this.pinService.getRegion().subscribe((res) => {
      this.regions = res;
    });
  }

  onSubmit() {
    this.dialogRef.close(this.form?.value);
  }
}
