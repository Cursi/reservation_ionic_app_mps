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
    this.scheduledResource = 
    {
      "organizationName": "",
      "resourceName": "",
      "reservationReason": "",
      "startTimestamp": 0,
      "endTimestamp": 0,
      "userEmail": this.dbService.userEmail
    };

    this.startDatetime = "";
    this.endDatetime = "";
  }

  SelectOrganization(selectedValue)
  {
    this.scheduledResource.organizationName = selectedValue.name;
  }

  SelectStartTimestamp(selectedStartValue)
  {
    console.log(selectedStartValue);
  }

  AreValidValues()
  {
    return this.scheduledResource.organizationName.length !== 0 &&
      this.scheduledResource.resourceName.length !== 0 &&
      this.scheduledResource.reservationReason.length !== 0 &&
      (new Date(this.scheduledResource.startTimestamp)).getTime() > 0 &&
      (new Date(this.scheduledResource.endTimestamp)).getTime() > 0 &&
      this.scheduledResource.endTimestamp >= this.scheduledResource.startTimestamp; 
  }

  ScheduleResource()
  {
    this.scheduledResource.startTimestamp = Date.parse(this.startDatetime); 
    this.scheduledResource.endTimestamp = Date.parse(this.endDatetime);
    
    if(this.AreValidValues())
    {
      this.dbService.AddSchedule(this.scheduledResource);
      this.ResetScheduleInputs();
    }
    else
      this.toastService.ShowToast("Couldn't add this schedule!");
  }
}