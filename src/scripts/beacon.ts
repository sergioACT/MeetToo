import { BluetoothLe } from "@capacitor-community/bluetooth-le";

export class Beacon {
    async startScan() {
        var devices = await BluetoothLe.requestLEScan();
        console.log('Dispositivos encontrados:', devices);
    }
    async connectToDevice(deviceId: string) {
        try {
            const result = await BluetoothLe.connect({ deviceId: deviceId });
            console.log('Conectado al dispositivo:', result);
            // Puedes proceder a descubrir servicios y características
        } catch (error) {
            console.error('Error al conectar:', error);
        }
    }

    async discoverServices(deviceId: string) {
        try {
            const result = await BluetoothLe.discoverServices({ deviceId: deviceId });
            console.log('Servicios descubiertos:', result);
        } catch (error) {
            console.error('Error al descubrir servicios:', error);
        }
    }

    async writeToCharacteristic(deviceId: string, serviceUUID: string, characteristicUUID: string, value: string) {
        try {
            await BluetoothLe.write({
                deviceId: deviceId,
                service: serviceUUID,
                characteristic: characteristicUUID,
                value: btoa(value) // Convierte el valor a base64
            });
            console.log('Datos enviados');
        } catch (error) {
            console.error('Error al enviar datos:', error);
        }
    }

    async subscribeToCharacteristic(deviceId: string, serviceUUID: string, characteristicUUID: string) {
        try {
            await BluetoothLe.startNotifications({
                deviceId: deviceId,
                service: serviceUUID,
                characteristic: characteristicUUID,
            });

            BluetoothLe.addListener('bluetoothPeripheralData', (result) => {
                console.log('Datos recibidos:', result.value); // Convierte el valor de base64 a string
            });
        } catch (error) {
            console.error('Error al recibir datos:', error);
        }
    }

    async readCharacteristic(deviceId: string, serviceUUID: string, characteristicUUID: string) {
        try {
            const result = await BluetoothLe.read({
                deviceId: deviceId,
                service: serviceUUID,
                characteristic: characteristicUUID
            });
            console.log('Datos leídos:', result.value); // Decodifica de base64
        } catch (error) {
            console.error('Error al leer característica:', error);
        }
    }
}