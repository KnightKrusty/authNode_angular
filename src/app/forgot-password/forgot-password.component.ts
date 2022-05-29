import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: [
    './forgot-password.component.scss',
    '../login/login.component.scss',
  ],
})
export class ForgotPasswordComponent implements OnInit {
  public forgotForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.forgotForm = this.formBuilder.group({
      email: ['',  [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
      ],],
    });
  }

  Forgot() {
    if (this.forgotForm.valid) {
      this.http
      .post<any>(
        'http://localhost:3000/api/users/forgotpassword',
        this.forgotForm.value
      )
      .subscribe(
        (res) => {
          console.log(res);
          alert(res.message);
          this.forgotForm.reset();
          this.router.navigate(['login']);
        },
        (err) => {
          console.log(err);
          alert(err.error.message);
        }
      );
    }
  }
}
