import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-ruta',
  templateUrl: './ruta.page.html',
  styleUrls: ['./ruta.page.scss'],
  standalone: false,
})
export class RutaPage implements AfterViewInit {
  @ViewChild('mapa', { read: ElementRef }) mapa!: ElementRef<HTMLElement>;

  private scale = 1;
  private startDist = 0;
  private startScale = 1;

  // GESTO 3: Pinch / Zoom sobre el mapa (dos dedos). Doble toque restablece.
  ngAfterViewInit() {
    const el = this.mapa.nativeElement;

    el.addEventListener('touchstart', (e: TouchEvent) => {
      if (e.touches.length === 2) {
        this.startDist = this.distancia(e);
        this.startScale = this.scale;
      }
    }, { passive: true });

    el.addEventListener('touchmove', (e: TouchEvent) => {
      if (e.touches.length === 2) {
        e.preventDefault();
        const d = this.distancia(e);
        this.scale = Math.min(4, Math.max(1, this.startScale * (d / this.startDist)));
        el.style.transform = `scale(${this.scale})`;
      }
    }, { passive: false });

    el.addEventListener('dblclick', () => {
      this.scale = 1;
      el.style.transform = 'scale(1)';
    });
  }

  private distancia(e: TouchEvent): number {
    const dx = e.touches[0].clientX - e.touches[1].clientX;
    const dy = e.touches[0].clientY - e.touches[1].clientY;
    return Math.hypot(dx, dy);
  }
}
