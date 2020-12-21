import { Component } from '@angular/core';
import { FirebaseDatabaseService } from '../firebase-database.service';

@Component
({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page 
{
  constructor(private dbService: FirebaseDatabaseService) {}

  userOrganizations = [];
  schedules: any = [];
  selectedOrganizationName = null;

  ngOnInit()
  {
    this.dbService.organizationsObservable.subscribe(data =>
    {
      this.userOrganizations = this.dbService.GetUserOrganizations(data);
    });

    this.dbService.GetSchedulesObservable().subscribe(data =>
    {
      if(this.selectedOrganizationName !== null)
      {
        this.dbService.GetOrganizationSchedules(this.selectedOrganizationName).then(data =>
        {
          this.schedules = data; 
        });
      }
    });
  }

  async SelectOrganization(selectedValue)
  {
    this.selectedOrganizationName = selectedValue.name;
    this.schedules = await this.dbService.GetOrganizationSchedules(this.selectedOrganizationName);
  }

  DeleteSchedule(scheduleKey)
  {
    this.dbService.DeleteSchedule(scheduleKey);
  }
}