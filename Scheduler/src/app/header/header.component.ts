import { Component, OnInit } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';
import { FirebaseAuthService } from '../firebase-auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit 
{
  constructor(private firebaseAuthService: FirebaseAuthService, private router: Router) 
  {
    this.router.events.subscribe((event: Event) => 
    {
      if(this.lastRoute === "/" && event instanceof NavigationStart && event.url.includes("tabs"))
        this.logOutHidden = false;
    });
  }

  logOutHidden = true;
  lastRoute = null;

  ngOnInit()
  {
    this.lastRoute = this.router.url;
    console.log(this.lastRoute);
    // localStorage.removeItem("userData");

    if(localStorage.getItem("userData") !== null)
      this.logOutHidden = false;
  }

  LogOut()
  {
    this.firebaseAuthService.Logout().then(() => 
    {
      this.logOutHidden = true;
      this.router.navigateByUrl("");
    });
  }
}
