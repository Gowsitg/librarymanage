import { Component ,DoCheck,OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './shared/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements DoCheck {
  
  constructor(private router: Router,private authservice: AuthService) {}
  newuser: boolean = true;
  
  ngDoCheck(): void {
    let currenturl = this.router.url;

    if (currenturl == '/admin/login' || currenturl == '/admin/registration') {
      this.newuser = false;
    } else { 
      if(this.authservice.IsloggedIn()) {
        this.newuser = false;

      } else {
        this.newuser = true;
      }
    }
  };

  login() {
    this.router.navigate(['/admin/login']);
  }

  reg() {
    this.router.navigate(['/admin/registration']);
  }
}
