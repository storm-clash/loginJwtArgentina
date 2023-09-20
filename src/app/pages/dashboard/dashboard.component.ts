import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/auth/login.service';
import { User } from 'src/app/services/auth/user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
 
 constructor(private loginService:LoginService){}
  ngOnDestroy(): void {
   this.loginService.currentUserData.unsubscribe();
   this.loginService.currentUserLogin.unsubscribe();
  }
  ngOnInit(): void {
    this.loginService.currentUserLogin.subscribe({
      next: (userLoginOn) =>{
        this.userLoginOn = userLoginOn;
      }
    });
    this.loginService.currentUserData.subscribe({
      next:(userData)=>{
        this.userData=userData;
      }
    })
  }
  userLoginOn : boolean = false;
  userData!:User;

}
