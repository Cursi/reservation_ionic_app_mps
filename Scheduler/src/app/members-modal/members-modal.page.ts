import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { FirebaseDatabaseService } from '../firebase-database.service';

@Component({
  selector: 'app-members-modal',
  templateUrl: './members-modal.page.html',
  styleUrls: ['./members-modal.page.scss'],
})
export class MembersModalPage implements OnInit
{
  constructor(private dbService: FirebaseDatabaseService, private modalController: ModalController) { }

  @Input() organizationKey: string;
  @Input() isOwner: string;

  newMemberEmail = "";
  organizationMembers = [];

  ngOnInit() 
  {
    this.dbService.GetOrganizationMembersObservable(this.organizationKey).subscribe(data =>
    {
      this.organizationMembers = this.dbService.GetOrganizationMembers(data);
    });
  }

  DismissModal()
  {
    this.modalController.dismiss();
  }

  async AddMember()
  {
    if(await this.dbService.AddMember(this.organizationKey, this.newMemberEmail))
      this.newMemberEmail = "";
  }

  DeleteMember(memberKey)
  {
    this.dbService.DeleteMember(this.organizationKey, memberKey);
  }

  EditMemberPermission(memberEmail, memberKey, newMemberPermission)
  {
    this.dbService.EditMemberPermission(this.organizationKey, memberEmail, memberKey, newMemberPermission);
  }
}