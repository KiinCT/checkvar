import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-customerlist',
  templateUrl: './customerlist.component.html',
  styleUrls: ['./customerlist.component.css']
})
export class CustomerlistComponent implements OnInit {
  customers: any;

  constructor(private authService: AuthService) {}

  ngOnInit() {
  const token = localStorage.getItem('access_token');
  if (token) {
    this.loadCustomers();
  }
}

  loadCustomers() {
    this.authService.getCustomerList().subscribe({
      next: (res) => {
        this.customers = res;
      },
      error: (err) => {
        console.error('Lỗi khi load customer:', err);
      }
    });
  }
}
