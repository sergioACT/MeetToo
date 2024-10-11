import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root'
})

export class Api {
    private apiUrl = "https://api-epzqvlke7a-uc.a.run.app/api/location";

    constructor(private client: HttpClient) { }

    // Método para hacer una solicitud POST
    sendData(data: any): Observable<any> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        return this.client.post<any>(this.apiUrl, data, { headers });
    }

}
