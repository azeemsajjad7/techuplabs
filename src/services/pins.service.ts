import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable()
export class PinService {
  private apiUrl = 'https://techuplabs-be.vercel.app/api/get-country';

  constructor(private http: HttpClient) {}

  public getRegion(): Observable<string[]> {
    return this.http.get(this.apiUrl).pipe(
      map((resp: any) => {
        const uniqueRegions = new Set<string>();
        resp.result.forEach((item: any) => uniqueRegions.add(item.region));
        return Array.from(uniqueRegions);
      })
    );
  }

  public getCountry(region: string): Observable<string[]> {
    return this.http.get(this.apiUrl).pipe(
      map((resp: any) => {
        return resp.result
          .filter((item: any) => item.region === region)
          .map((item: any) => item.country);
      })
    );
  }
}
