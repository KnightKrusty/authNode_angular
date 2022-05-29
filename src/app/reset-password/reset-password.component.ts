import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: [
    './reset-password.component.scss',
    '../login/login.component.scss',
  ],
})
export class ResetPasswordComponent implements OnInit {
  public resetPassword!: FormGroup;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.resetPassword = this.formBuilder.group({
      password: [''],
      passwordConfirm: [''],
    });
  }

  passwordReset() {
    let resettoken = '';
    this.route.params.subscribe(
      (params) => (resettoken = params['resettoken'])
    );

    const { password, passwordConfirm } = this.resetPassword.value;

    if (password === passwordConfirm) {
      this.http
        .post<any>(
          `http://localhost:3000/api/users/reset/${resettoken}`,
          this.resetPassword.value
        )
        .subscribe((res) => {
          console.log(res);
          this.resetPassword.reset();
          alert('Password reset succesfully');
          this.router.navigate(['login']);
        });
    } else {
      alert('Password do not match');
    }
  }
}
