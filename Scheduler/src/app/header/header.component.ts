import { Component, OnInit } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';
import { FirebaseAuthService } from '../firebase-auth.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit 
{
  constructor(private firebaseAuthService: FirebaseAuthService, private router: Router, private navCtrl: NavController) 
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

    if(localStorage.getItem("userData") !== null)
      this.logOutHidden = false;
  }

  LogOut()
  {
    this.firebaseAuthService.Logout().then(() => 
    {
      this.logOutHidden = true;
      this.router.navigateByUrl("").then(() => location.reload());
    });
  }
}
