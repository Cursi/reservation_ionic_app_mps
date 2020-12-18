import { Component } from '@angular/core';
import { FirebaseDatabaseService } from '../firebase-database.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page 
{
  constructor(private dbService: FirebaseDatabaseService) {}

  newOrganizationName = "";
  userOrganizations = [];
  
  ngOnInit()
  {
    this.dbService.organizationsObservable.subscribe(data =>
    {
      this.userOrganizations = this.dbService.GetUserOrganizations(data);
    });

    // this.dbService.SimpleTest();
  }

  DeleteOrganization(organizationKey)
  {
    this.dbService.DeleteOrganization(organizationKey);
  }

  LeaveOrganization(organizationKey)
  {
    this.dbService.LeaveOrganization(organizationKey);
  }

  OpenOrganizationModal(organizationKey)
  {
    console.log(`To be opened a modal for organization: ${organizationKey}`);
  }

  async CreateOrganization()
  {
    if(await this.dbService.AddOrganization(this.newOrganizationName))
      this.newOrganizationName = "";
  }
}