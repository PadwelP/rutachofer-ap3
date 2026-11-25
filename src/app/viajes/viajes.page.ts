import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';

interface Viaje {
  origen: string; destino: string; cliente: string; bultos: number; estado: string;
}

@Component({
  selector: 'app-viajes',
  templateUrl: './viajes.page.html',
  styleUrls: ['./viajes.page.scss'],
  standalone: false,
})
export class ViajesPage {
  viajes: Viaje[] = [
    { origen: 'Santiago', destino: 'Puerto Plata', cliente: 'Ferretería López', bultos: 2, estado: 'Asignado' },
    { origen: 'Santiago', destino: 'La Vega', cliente: 'Agro Centro', bultos: 1, estado: 'Programado' },
    { origen: 'Santiago', destino: 'Moca', cliente: 'Super Mica', bultos: 3, estado: 'Programado' },
  ];

  constructor(private toast: ToastController) {}

  // GESTO 2: pull-to-refresh -> recarga la lista de viajes del día
  doRefresh(ev: any) {
    setTimeout(() => {
      this.viajes.unshift({
        origen: 'Santiago', destino: 'Navarrete', cliente: 'Depósito Central', bultos: 4, estado: 'Asignado',
      });
      ev.target.complete();
    }, 1200);
  }

  // GESTO 1: swipe para eliminar -> quita el viaje de la lista
  async eliminar(v: Viaje) {
    this.viajes = this.viajes.filter((x) => x !== v);
    const t = await this.toast.create({ message: 'Viaje eliminado', duration: 1200, color: 'dark' });
    await t.present();
  }

  abrir(_v: Viaje) {
    // En la app real abre el detalle del viaje.
  }
}
