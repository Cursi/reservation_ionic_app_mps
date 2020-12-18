import { Component } from '@angular/core';
import { FirebaseDatabaseService } from '../firebase-database.service';
import { ModalController } from '@ionic/angular';
import { MembersModalPage } from '../members-modal/members-modal.page';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page 
{
  constructor(private dbService: FirebaseDatabaseService, private modalController: ModalController) {}

  newOrganizationName = "";
  userOrganizations = [];
  
  ngOnInit()
  {
    this.dbService.organizationsObservable.subscribe(data =>
    {
      this.userOrganizations = this.dbService.GetUserOrganizations(data);
    });
  }

  DeleteOrganization(organizationKey)
  {
    this.dbService.DeleteOrganization(organizationKey);
  }

  LeaveOrganization(organizationKey)
  {
    this.dbService.LeaveOrganization(organizationKey);
  }

  async OpenOrganizationModal(organizationKey, isOwner)
  {
    const modal = await this.modalController.create
    ({
      component: MembersModalPage,
      componentProps: 
      {
        "organizationKey": organizationKey,
        "isOwner": isOwner
      }
    });

    await modal.present();

  }

  async CreateOrganization()
  {
    if(await this.dbService.AddOrganization(this.newOrganizationName))
      this.newOrganizationName = "";
  }
}