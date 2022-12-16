import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
  constructor(
    private service: TokenStorageService,
    private route: Router
  ){}

  logout(){
    this.service.clear();
    this.route.navigateByUrl('/login');
  }
}
