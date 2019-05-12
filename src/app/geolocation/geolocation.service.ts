import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GeolocationModel } from './geolocation.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

  constructor(private http: HttpClient) { }

  searchGeocode(query: string): Observable<GeolocationModel[]> {
    return this.http.get<GeolocationModel[]>('https://us1.locationiq.com/v1/search.php', {
      params: {
        'key': 'fe558050ffd602',
        'format': 'json',
        'q': query,
        'addressdetails': '1'
      }
    })
      .pipe(map(results =>
        results.map(value => ({
          ...value,
          display_name:
            (value.address.road ? value.address.road + ', ' : '') +
            (value.address.suburb ? value.address.suburb + ', ' : '') +
            ((value.address.city_district || value.address.city) ? (value.address.city_district || value.address.city) + ', ' : '') +
            (value.address.state ? value.address.state + ', ' : '') +
            (value.address.country ? value.address.country + '.' : '')
        }))
      ));
  }
}
