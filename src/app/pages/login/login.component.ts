import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/auth/login.service';
import { LoginRequest } from 'src/app/services/auth/loginRequest';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginError:string ='';
  loginForm = this.form.group({
    email : ['ifarocks26@gmail.com',[Validators.required,Validators.email]],
    password : ['',Validators.required],
  })


  constructor(private form:FormBuilder, private router:Router, private auth:LoginService){}

  get email(){
    return this.loginForm.controls.email;
  }

  get password(){
    return this.loginForm.controls.password;
  }

  login(){
    if(this.loginForm.valid){
        this.auth.login(this.loginForm.value as LoginRequest).subscribe({
          next: (userData) => {
            console.log(userData);
          },
          error: (errorData) => {
            console.error(errorData);
            this.loginError = errorData;
          },
          complete: () => {
            console.info("login Completo");
            this.router.navigateByUrl('/inicio');
            this.loginForm.reset();
          }
        })
        
    }
    else{
      this.loginForm.markAllAsTouched();
    }
  }

}
