import { Component, input } from '@angular/core';

export type ServerStatus = 'checking' | 'online' | 'offline';

@Component({
  selector: 'app-server-status',
  imports: [],
  templateUrl: './server-status.html',
  styleUrl: './server-status.css',
})
export class ServerStatusComponent {
  readonly status = input.required<ServerStatus>();

  get label(): string {
    switch (this.status()) {
      case 'online':
        return 'Servidor ativo';
      case 'offline':
        return 'Servidor inativo';
      default:
        return 'Verificando servidor';
    }
  }
}
