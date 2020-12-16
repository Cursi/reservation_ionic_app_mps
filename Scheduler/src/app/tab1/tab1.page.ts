import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Component
({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page 
{
  constructor(private firebaseAuth: AngularFireAuth) {}
  dummyUser = { email: "test@something.com", password: "pass123"};
  userStatus = null;

  ngOnInit()
  {
    let userData = JSON.parse(localStorage.getItem("userData"));
    this.userStatus = userData === null ? "No user logged in!" : userData.user.email;
    console.log(userData === null ? "No user logged in!" : userData.user.email);
  }

  async Register()
  {
    let responseUser = null;

    try
    {
      responseUser = await this.firebaseAuth.createUserWithEmailAndPassword
      (
        this.dummyUser.email,
        this.dummyUser.password
      );
    }
    catch(err) {}

    if(responseUser !== null)
    {
      localStorage.setItem("userData", JSON.stringify(responseUser));
      this.userStatus = responseUser.user.email;
      console.log(`${responseUser.user.email} registered gracefully!`);
    }
    else
      console.log("TODO: Afisat ceva mesaj dummy de eroare de register");
  }

  async Login()
  {
    let responseUser = null;

    try
    {
      responseUser = await this.firebaseAuth.signInWithEmailAndPassword
      (
        this.dummyUser.email,
        this.dummyUser.password
      );
    }
    catch(err) {}

    if(responseUser !== null)
    {
      localStorage.setItem("userData", JSON.stringify(responseUser));
      this.userStatus = responseUser.user.email;
      console.log(`${responseUser.user.email} logged in gracefully!`);
    }
    else
      console.log("TODO: Afisat ceva mesaj dummy de eroare");
  }

  async Logout()
  {
    try
    {
      await this.firebaseAuth.signOut();
      localStorage.removeItem("userData");

      this.userStatus = "No user logged in!";
      console.log("Logged out gracefully!");
    }
    catch(err) {}
  }
}