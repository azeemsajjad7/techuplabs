import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PinsComponent } from './pins/pins.component';
import { PinService } from 'src/services/pins.service';
import { CustomerComponent } from './shared/customer/customer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxSelectModule } from 'ngx-select-ex';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { PinComponent } from './shared/pin/pin.component';
import { FileUploadModule } from 'ng2-file-upload';

@NgModule({
  declarations: [AppComponent, PinsComponent, CustomerComponent, PinComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxSelectModule,
    MatDialogModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FileUploadModule,
  ],
  providers: [PinService],
  bootstrap: [AppComponent],
})
export class AppModule {}
