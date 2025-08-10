import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }


  login(username: string, password: string): Observable<any> {
    const body = { username, password };
    return this.http.post(`${this.apiUrl}/api/v1/admin/auth/login`, body);
  }


  getCustomerList(): Observable<any> {
    const token = localStorage.getItem('access_token');
    if (!token) {
      console.error('Không có token trong localStorage. Không thể thực hiện yêu cầu.');
      throw new Error('User chưa đăng nhập. Token rỗng.');
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.apiUrl}/api/v1/admin/customer/list`, { headers });
  }
}
