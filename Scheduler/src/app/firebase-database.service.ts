import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})

export class FirebaseDatabaseService
{
  public organizationsObservable: Observable<any[]>;
  public userEmail;

  constructor(public db: AngularFireDatabase, private toastService: ToastService) 
  {
    this.userEmail = JSON.parse(localStorage.getItem("userData")).user.email; 
    this.organizationsObservable = db.list('organizations').snapshotChanges();
  }

  MapOrganizations(data)
  {
    return data.map(data => Object
    ({
      "key": data.payload.key,
      "name": data.payload.val().name,
      "ownerEmail": data.payload.val().ownerEmail,
      "members": data.payload.val().members
    }));
  }

  MapMembers(data)
  {
    return data.map(data => Object
    ({
      "key": data.payload.key,
      "email": data.payload.val().email,
      "permission": data.payload.val().permission
    })); 
  }

  GetUserOrganizations(data)
  {
    let mappedData = this.MapOrganizations(data);

    let ownedOrganizations = mappedData.filter(organization => organization.ownerEmail === this.userEmail);
    let memberOrganizations = mappedData.filter(organization => 
    {
      if(organization.members)
      {
        let membersArray = Object.keys(organization.members).map((key) => organization.members[key]);
        let membersEmails = membersArray.map(membersArray => membersArray.email);
        return membersEmails.includes(this.userEmail);
      }
    });

    return ownedOrganizations ? ownedOrganizations.concat(memberOrganizations) : null;
  }

  DeleteOrganization(organizationKey)
  {
    this.db.object(`/organizations/${organizationKey}`).remove();
  }

  LeaveOrganization(organizationKey)
  {
    this.db.list(`/organizations/${organizationKey}/members`).snapshotChanges().pipe(first()).toPromise().then(data =>
    {
      let mappedData = this.MapMembers(data);
      let memberKey = mappedData.filter(member => member.email === this.userEmail)[0].key;
      this.db.object(`/organizations/${organizationKey}/members/${memberKey}`).remove();
    });
  }

  AddOrganization(newOrganizationName)
  {
    let organizationExists = 1;

    return this.organizationsObservable.pipe(first()).toPromise().then(data =>
    {
      organizationExists = (this.MapOrganizations(data).filter(organization => organization.name === newOrganizationName)).length;
    }).then(() =>
    {
      if(newOrganizationName.trim().length !== 0 && !organizationExists)
      {
        this.db.list('organizations').push
        ({
          "name": newOrganizationName,
          "ownerEmail": this.userEmail
        });
  
        return true;
      }
      else
        this.toastService.ShowToast("Couldn't create this organization!");
  
      return false;
    });
  }

  GetOrganizationMembersObservable(organizationKey)
  {
    return this.db.list(`/organizations/${organizationKey}/members`).snapshotChanges();
  }

  GetOrganizationMembers(data)
  {  
    return this.MapMembers(data);
  }

  AddMember(organizationKey, newMemberEmail)
  {
    let memberExists = 1;

    return this.db.list(`/organizations/${organizationKey}/members`).snapshotChanges().pipe(first()).toPromise().then(data =>
    {
      memberExists = (this.MapMembers(data).filter(member => member.email === newMemberEmail)).length;

      if(newMemberEmail.trim().length !== 0 && !memberExists)
      {
        this.db.list(`/organizations/${organizationKey}/members`).push
        ({
          "email": newMemberEmail,
          "permission": "read"
        });
  
        return true;
      }
      else
        this.toastService.ShowToast("Couldn't add this member!");

      return false;
    });
  }

  DeleteMember(organizationKey, memberKey)
  {
    console.log(organizationKey + " " + memberKey);
    this.db.object(`/organizations/${organizationKey}/members/${memberKey}`).remove();
  }

  EditMemberPermission(organizationKey, memberEmail, memberKey, newMemberPermission)
  {
    this.db.object(`/organizations/${organizationKey}/members/${memberKey}`).set
    ({
      "email": memberEmail,
      "permission": newMemberPermission
    });
  }

  AddSchedule()
  {
    this.db.list("/schedules").push({
      "organizationName": "ORG1",
      "resourceName": "R2",
      "startTimestamp": 30,
      "endTimestamp": 70,
      "reason": "Bla, bla, bla 3",
    });
  }
}