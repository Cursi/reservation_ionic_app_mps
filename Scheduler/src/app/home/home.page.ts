import { Component, OnInit } from '@angular/core';
import { FirebaseAuthService } from '../firebase-auth.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit
{
  constructor(private firebaseAuthService: FirebaseAuthService, private router: Router, private toast: ToastController) { }

  private errorToast: any;
  submitType = "Login"
  
  loginText = "Already have an account? Switch to <strong>login</strong>!";
  registerText = "Don't have an account? Switch to <strong>register</strong>!";

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
      this.firebaseAuthService.Register(this.user).then(responseUser =>
      {
        console.log(responseUser);
  
        if(responseUser !== null)
        {
          localStorage.setItem("userData", JSON.stringify(responseUser));
          this.router.navigateByUrl("/tabs");
        }
        else
          this.ShowErrorToast("Couldn't create the account!");
      });
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
          this.ShowErrorToast("Couldn't login!");
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

  ShowErrorToast(errorMessage) 
  {
    this.errorToast = this.toast.create
    ({
      message: errorMessage,
      duration: 1500
    }).then((toastData) => toastData.present()); 
  }
}