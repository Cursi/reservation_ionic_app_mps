import { Component, OnInit } from '@angular/core';
import { FirebaseAuthService } from '../firebase-auth.service';
import { Router } from '@angular/router';
import { ToastService } from '../toast.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit
{
  constructor
  (
    private firebaseAuthService: FirebaseAuthService, 
    private router: Router, 
    private toastService: ToastService
  ) { }

  private errorToast: any;
  submitType = "Login"
  
  loginText = "Already have an account? Switch to <strong class='primaryColor'>login</strong>!";
  registerText = "Don't have an account? Switch to <strong class='primaryColor'>register</strong>!";

  switchText = this.registerText;

  user = { email: "", password: ""};

  ngOnInit() 
  {
    if(localStorage.getItem("userData") !== null)
      this.router.navigateByUrl("/tabs");
  }

  SubmitAuth()
  {
    if(this.submitType === "Register")
    {
      if(this.user.email.trim().length !== 0 && this.user.password.trim().length !== 0)
      {
        this.firebaseAuthService.Register(this.user).then(responseUser =>
        {
          if(responseUser !== null)
          {
            localStorage.setItem("userData", JSON.stringify(responseUser));
            this.router.navigateByUrl("/tabs");
          }
          else
            this.toastService.ShowToast("Couldn't create the account!");
        });
      }
      else
        this.toastService.ShowToast("Couldn't create the account!");
    }
    else if(this.submitType === "Login")
    {
      this.firebaseAuthService.Login(this.user).then(responseUser =>
      {
        if(responseUser !== null)
        {
          localStorage.setItem("userData", JSON.stringify(responseUser));
          this.router.navigateByUrl("/tabs");
        }
        else
        this.toastService.ShowToast("Couldn't login!");
      });
    }
  }

  SwitchAuth()
  {
    if(this.submitType === "Register")
    {
      this.submitType = "Login";
      this.switchText = this.registerText;
    }
    else if(this.submitType === "Login")
    {
      this.submitType = "Register";
      this.switchText = this.loginText;
    }
  }
}