import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  EmailValidator,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', '../app.component.scss'],
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
        ],
      ],
      password: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  login() {
    if (this.loginForm.valid) {
      this.http
        .post('http://localhost:3000/api/users/login/', this.loginForm.value)
        .subscribe(
          (res) => {
            // console.log(res.token);
            // @ts-ignore

            localStorage.setItem('token', res?.token);

            this.router.navigate(['profile']);
          },
          (err) => {
            console.log(err);
            alert(`${err.error.message}`);
          }
        );
    }
  }
}
