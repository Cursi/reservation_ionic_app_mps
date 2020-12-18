import { Component } from '@angular/core';
import { FirebaseDatabaseService } from '../firebase-database.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page
{
  constructor(private dbService: FirebaseDatabaseService) {}

  userOrganizations = [];

  selectedOrganization = null;
  scheduledResource = 
  {
    "organizationName": "",
    "resourceName": "",
    "reservationReason": "",
    "startTimestamp": "",
    "endTimestamp": ""
  }

  ngOnInit()
  {
    this.dbService.organizationsObservable.subscribe(data =>
    {
      this.userOrganizations = this.dbService.GetUserOrganizations(data);
      console.log(this.userOrganizations);
    });

    // this.dbService.AddSchedule();
  }

  SelectOrganization(selectedValue)
  {
    this.selectedOrganization = selectedValue;
    console.log(this.selectedOrganization);
  }
}
