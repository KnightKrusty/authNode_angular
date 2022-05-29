import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss', '../login/login.component.scss']
})
export class SignupComponent implements OnInit {

  public signupForm !: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
    ) { }
  

  ngOnInit(): void {

    this.signupForm = this.formBuilder.group({
      email: ['', [
        Validators.required,
        Validators.email
      ]]
    })

    console.log(this.signupForm.value)

  }

  Signup() {
   if (this.signupForm.valid) {
    this.http.post<any>("http://localhost:3000/api/emailVerify", this.signupForm.value).subscribe(res => {
      alert(`SignUP Succesful ${res.message}`)
      this.signupForm.reset()
      this.router.navigate(['login'])
    }, err => {
      console.log(err.error.message)
      alert(`${err.error.message}`)
    })
   }
  }

}

