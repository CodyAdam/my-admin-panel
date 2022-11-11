import { Component } from '@angular/core';
import { TokenStorageService } from './services/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'fr-administration-front';

  constructor(private tokenStorage: TokenStorageService) {}

  isLogged() {
    return this.tokenStorage.isLogged();
  }

  handleLogout() {
    this.tokenStorage.clear();
    window.location.reload();

  }
}
