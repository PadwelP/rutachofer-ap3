import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  public appPages = [
    { title: 'Mis viajes', url: '/viajes', icon: 'list' },
    { title: 'En ruta', url: '/ruta', icon: 'navigate' },
    { title: 'Perfil', url: '/perfil', icon: 'person' },
  ];
  constructor() {}
}
