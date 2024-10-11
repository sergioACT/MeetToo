import { ToastController } from '@ionic/angular';
import { BluetoothLe } from "@capacitor-community/bluetooth-le";


export class Beacon {
  private scanListener: any;
  private devices: any[] = []; // Arreglo para almacenar los dispositivos encontrados

  constructor(private toastController: ToastController) {}

  async initializeBluetooth() {
    try {
      const result = await BluetoothLe.initialize();
      console.log('Bluetooth inicializado:', result);
      return result;
    } catch (error) {
      console.error('Error al inicializar Bluetooth:', error);
      throw error; 
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

  async startScan() {
    try {
      await this.initializeBluetooth();
      console.log('Iniciando escaneo de dispositivos...');

      this.scanListener = BluetoothLe.addListener('bluetoothPeripheralData', async (device) => {
        console.log('Dispositivo encontrado:', device);
        this.devices.push(device.value); // Almacenar el dispositivo en la lista
        await this.showToast("Dispostivos encontrados... "+ JSON.stringify(this.devices));

      });


      await BluetoothLe.requestLEScan();

      setTimeout(async () => {
        await BluetoothLe.stopLEScan();
        console.log('Escaneo detenido.');
        this.scanListener.remove();
        await this.showToast("Dispostivos encontrados... "+ JSON.stringify(this.devices));
      }, 20000);
    } catch (error) {
      console.error('Error durante el escaneo:', error);
    }
  }
  async connectToDevice(deviceId: string) {
    try {
      const result = await BluetoothLe.connect({ deviceId: deviceId });
      console.log(`Conectado al dispositivo ${deviceId}:`, result);
      await this.discoverServices(deviceId);
    } catch (error) {
      console.error(`Error al conectar con el dispositivo ${deviceId}:`, error);
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

  // Resto de los métodos...
}
