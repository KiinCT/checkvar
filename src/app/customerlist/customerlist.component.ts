import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-customerlist',
  templateUrl: './customerlist.component.html',
  styleUrls: ['./customerlist.component.css']
})
export class CustomerlistComponent implements OnInit {
  customers: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers() {
    const token = localStorage.getItem('access_token');
    if (!token) {
      console.error('Không tìm thấy token!');
      return;
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    this.http.get<any>('http://localhost:8080/api/v1/admin/customer/list', { headers })
      .subscribe({
        next: (res) => {
          this.customers = res.data;
        },
        error: (err) => {
          console.error('Lỗi khi lấy dữ liệu:', err);
        }
      });
  }
}
