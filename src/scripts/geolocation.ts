import { Geolocation } from '@capacitor/geolocation';
import { ToastController } from '@ionic/angular';
import { IUser } from '../interfaces/iuser';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Api } from './Api';


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
            latitude,
            longitude,
            radius: 10
        };
        try {
            const nearbyDevicesResponse = await new Api(this.client).sendData(locate).toPromise();
    
            return nearbyDevicesResponse;
        } catch (error) {
            console.error('Error al enviar datos:', error);
            return null; // Manejo simple de errores
        }
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
