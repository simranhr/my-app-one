import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  constructor(private formBuilder:FormBuilder, private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    this.loginForm =  this.formBuilder.group({
      email:['',Validators.required],
      password:['',Validators.required]
    })
  }

  login() {
    this.http.get<any>("http://localhost:3000/signup").subscribe(res => {
      debugger
      //match the email and password
      var user = res.find((e:any) => {
        return e.email === this.loginForm.value.email && e.password === this.loginForm.value.password })
        //cond for login
        if(user) {
          alert("successfully logged in");
          this.loginForm.reset();
          this.router.navigate(['student'])
        } else {
          alert("User not found with these credentials");
        }
    },(err) => {
      alert("Something went wrong!")
    })
  }

}
