import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = '';
  password = '';
  message = '';

  constructor(private authService: AuthService) {}

  onLogin() {
    this.authService.login(this.username, this.password).subscribe({
      next: (res) => {
        const token = res.data?.access_token;
        if (token) {
          localStorage.setItem('access_token', token);
          this.message = 'Login thành công!';
        } else {
          this.message = 'Không nhận được token!';
        }
      },
      error: (err) => {
        console.error(err);
        this.message = 'Login thất bại!';
      }
    });
  }
}
