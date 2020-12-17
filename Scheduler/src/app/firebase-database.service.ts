import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class FirebaseDatabaseService
{
  public organizationsObservable: Observable<any[]>;
  public userEmail;

  constructor(public db: AngularFireDatabase) 
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
    console.log(organizationKey);
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

  // De aici plecam cu aduagatul de membri noi
  SimpleTest()
  {
    this.db.list('organizations/-MOmQxF13UncZpqrGjho/members').push
    ({
      "email": "test2@something.com",
      "permission": "read"
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
      if(newOrganizationName && !organizationExists)
      {
        this.db.list('organizations').push
        ({
          "name": newOrganizationName,
          "ownerEmail": this.userEmail
        });
  
        return true;
      }
      else
        console.log("TODO error toast!");
  
      return false;
    });
  }
}