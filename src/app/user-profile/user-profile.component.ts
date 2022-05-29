import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss', '../login/login.component.scss'],
})
export class UserProfileComponent implements OnInit {
  token: String = '';
  userdata: any;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    //@ts-ignore
    this.token = localStorage.getItem('token');

    if (this.token) {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}`,
      });

      //@ts-ignore
      this.http.get(`http://localhost:3000/api/users/`, { headers }).subscribe(
        (res) => {
          //@ts-ignore
          this.userdata = res.user;
          console.log(this.userdata)
        },
        (err) => {
          console.log(err.error);
        }
      );
    } else {
      this.router.navigate(['login']);
    }
  }

  logout() {
    localStorage.removeItem("token")
    this.router.navigate(["login"])
  }

}
