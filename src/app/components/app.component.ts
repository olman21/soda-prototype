import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ToastyConfig } from "ng2-toasty";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  user: any;
  ngOnInit(): void {

    this.router.events.subscribe(route => {
      let userData = localStorage.getItem('userData');
      if (userData) {
        this.user = JSON.parse(userData);
      }
    });
  }

  isInRole(role: string): boolean {
    if (!this.user) return false;
    return this.user.roles.some(r => r == role);
  }

  logout() {
    localStorage.clear();
    this.user = null;
    this.router.navigate(['/login']);
  }
  constructor(private toastyConfig: ToastyConfig, private router: Router) {
    this.toastyConfig.theme = 'material';
  }
}
