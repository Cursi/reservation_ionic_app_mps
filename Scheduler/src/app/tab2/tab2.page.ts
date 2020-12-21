import { Component } from '@angular/core';
import { FirebaseDatabaseService } from '../firebase-database.service';
import { ToastService } from '../toast.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page
{
  constructor(private dbService: FirebaseDatabaseService, private toastService: ToastService) {}

  userOrganizations = [];
  scheduledResource = 
  {
    "organizationName": "",
    "resourceName": "",
    "reservationReason": "",
    "startTimestamp": 0,
    "endTimestamp": 0,
    "userEmail": this.dbService.userEmail
  }

  startDatetime = "";
  endDatetime = "";

  ngOnInit()
  {
    this.dbService.organizationsObservable.subscribe(data =>
    {
      this.userOrganizations = this.dbService.GetUserWritableOrganizations(data);
    });
  }

  ResetScheduleInputs()
  {
    this.scheduledResource.resourceName = ""; 
    this.scheduledResource.reservationReason = ""; 
    this.scheduledResource.startTimestamp = 0; 
    this.scheduledResource.endTimestamp = 0;

    this.startDatetime = "";
    this.endDatetime = "";
  }

  SelectOrganization(selectedValue)
  {
    this.scheduledResource.organizationName = selectedValue.name;
  }

  async ScheduleResource()
  {
    this.scheduledResource.startTimestamp = Date.parse(this.startDatetime);
    this.scheduledResource.endTimestamp = Date.parse(this.endDatetime);
    
    if(await this.dbService.AddSchedule(this.scheduledResource))
      this.ResetScheduleInputs();
    else
      this.toastService.ShowToast("Couldn't add this schedule!");
  }
}