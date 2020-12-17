import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthService
{
  constructor(private firebaseAuth: AngularFireAuth) {}

  async Register(requestedUser)
  {
    let responseUser = null;

    try
    {
      responseUser = await this.firebaseAuth.createUserWithEmailAndPassword
      (
        requestedUser.email,
        requestedUser.password
      );
    }
    catch(err) {}

    return responseUser;
  }

  async Login(requestedUser)
  {
    let responseUser = null;

    try
    {
      responseUser = await this.firebaseAuth.signInWithEmailAndPassword
      (
        requestedUser.email,
        requestedUser.password
      );
    }
    catch(err) {}

    return responseUser;
  }

  async Logout()
  {
    try
    {
      await this.firebaseAuth.signOut();
      localStorage.removeItem("userData");
    }
    catch(err) {}
  }
}