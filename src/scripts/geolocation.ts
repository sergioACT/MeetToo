import { Geolocation } from '@capacitor/geolocation';
import { ToastController } from '@ionic/angular';
import { IUser } from '../interfaces/iuser';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Api } from './Api';
import { Session } from './sesson';


@Injectable({
    providedIn: 'root'
})
export class Geolocations {
    private apiUrl = "https://api-epzqvlke7a-uc.a.run.app/api/geo-data";

    constructor(private toastController: ToastController, private client: HttpClient) { }

    async getLocation() {
        try {
            const coordinates = await Geolocation.getCurrentPosition();
            await this.showToast(`Latitude: ${coordinates.coords.latitude}, Longitude: ${coordinates.coords.longitude}`);
            return coordinates;
        } catch (error) {
            await this.showToast("Error getting location: " + error);
            return null;
        }
    }

    async sendLocation(user: IUser) {
        const coordinates = await this.getLocation();
        if (!coordinates) return;

        const { latitude, longitude } = coordinates.coords;
        user.latitude = latitude;
        user.longitude = longitude;



        const locate = {
            id: user.id.toString(), // Asegúrate de que esto coincida con el formato que necesitas
            latitude : user.latitude,
            longitude: user.longitude,
            radius: 10
        };



        var last_location = new Session("last_location");
        var last = last_location.get();

        var _new = JSON.stringify(locate);
        var las_locate = undefined;
        var distance: number | undefined = undefined;
        if (last) {
            las_locate = JSON.parse(last);
            distance = this.haversine(locate.latitude, locate.longitude, las_locate.latitude, las_locate.longitude);
        }

        // setInterval(async () => {
            if (distance ?? 1 > 0) {
                last_location.set(locate);
                try {
                    const nearbyDevicesResponse = await new Api(this.client).sendData(locate).toPromise();
                    return nearbyDevicesResponse;
                } catch (error) {
                    console.error('Error al enviar datos:', error);
                    return null; // Manejo simple de errores
                }
            }
        // }, 10000); // 10000 milisegundos = 10 segundos
        



    }

    haversine(lat1: number, lon1: number, lat2: number, lon2: number): number {
        const R = 6371e3; // Radio de la Tierra en metros
        const φ1 = lat1 * Math.PI / 180; // Convertir grados a radianes
        const φ2 = lat2 * Math.PI / 180;
        const Δφ = (lat2 - lat1) * Math.PI / 180;
        const Δλ = (lon2 - lon1) * Math.PI / 180;

        const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        const distance = R * c; // Distancia en metros
        return distance;
    }


    async showToast(message: string) {
        const toast = await this.toastController.create({
            message: message,
            duration: 2000,
            position: 'bottom',
        });
        toast.present();
    }
}
