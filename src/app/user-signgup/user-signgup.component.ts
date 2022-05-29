import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-signgup',
  templateUrl: './user-signgup.component.html',
  styleUrls: ['./user-signgup.component.scss', '../login/login.component.scss'],
})
export class UserSigngupComponent implements OnInit {
  public accountCreate!: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.accountCreate = this.formBuilder.group({
      name: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(10)]],
      passwordConfirm: ['', [Validators.required, Validators.minLength(10)]],
      dob: [Date, [Validators.required]],
      gender: [null, [Validators.required]],
    });
  }

  createAccount() {
    let magictoken = '';
    this.route.params.subscribe(
      (params) => (magictoken = params['magictoken'])
    );
    console.log(this.accountCreate.value);

    const { password, passwordConfirm } = this.accountCreate.value;

    if (password !== passwordConfirm) {
      alert('Password do not match');
    }

    if (this.accountCreate.valid && password === passwordConfirm) {
      this.http
        .post<any>(
          `http://localhost:3000/api/users/${magictoken}`,
          this.accountCreate.value
        )
        .subscribe(
          (res) => {
            console.log(res);
            alert(`Account created Succesfully `);
            this.accountCreate.reset();
            this.router.navigate(['login']);
          },
          (err) => {
            console.log(err.error.message);
            alert(`${err.error.message}`);
          }
        );
    }
  }
}
