import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule,RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'myapp';
  constructor(private userService: UserService, public router : Router) { }
  onLogout() {
    this.userService.logout();
    this.router.navigateByUrl('login');
    // Logic to log out the user
  }
}
