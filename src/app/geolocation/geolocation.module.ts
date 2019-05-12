import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeolocationService } from './geolocation.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [],
  providers: [ GeolocationService ],
  imports: [
    CommonModule,
    HttpClientModule,
  ]
})
export class GeolocationModule { }
