import { AfterViewInit, Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { ActionSheetController, GestureController } from '@ionic/angular';

interface Opcion { titulo: string; icon: string; }

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone: false,
})
export class PerfilPage implements AfterViewInit {
  @ViewChildren('itemLP', { read: ElementRef }) items!: QueryList<ElementRef>;

  opciones: Opcion[] = [
    { titulo: 'Mis datos', icon: 'id-card' },
    { titulo: 'Notificaciones', icon: 'notifications' },
    { titulo: 'Tema claro / oscuro', icon: 'moon' },
    { titulo: 'Cerrar sesión', icon: 'log-out' },
  ];

  constructor(
    private gestureCtrl: GestureController,
    private actionSheet: ActionSheetController,
  ) {}

  // GESTO 4: long-press (Gesture API de Ionic: createGesture().enable())
  ngAfterViewInit() {
    this.items.forEach((item, i) => {
      let timer: any;
      const gesture = this.gestureCtrl.create(
        {
          el: item.nativeElement,
          gestureName: 'long-press',
          threshold: 0,
          onStart: () => {
            timer = setTimeout(() => this.menuContextual(this.opciones[i]), 500);
          },
          onMove: () => clearTimeout(timer),
          onEnd: () => clearTimeout(timer),
        },
        true,
      );
      gesture.enable();
    });
  }

  async menuContextual(o: Opcion) {
    const sheet = await this.actionSheet.create({
      header: o.titulo,
      subHeader: 'Menú contextual (long-press)',
      buttons: [
        { text: 'Abrir', icon: 'open-outline' },
        { text: 'Editar', icon: 'create-outline' },
        { text: 'Eliminar', icon: 'trash-outline', role: 'destructive' },
        { text: 'Cancelar', icon: 'close', role: 'cancel' },
      ],
    });
    await sheet.present();
  }
}
