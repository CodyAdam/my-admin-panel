import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from './services/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'fr-administration-front';

  constructor(
    private tokenStorage: TokenStorageService,
    private router: Router
  ) {}

  isLogged() {
    return this.tokenStorage.isLogged();
  }

  handleLogout() {
    this.tokenStorage.clear();
    // refresh the page
    window.location.reload();
  }
}
