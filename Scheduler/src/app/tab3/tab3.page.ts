import { Component } from '@angular/core';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page 
{
  constructor() {}

  newOrganizationName = "";

  organizations = 
  [
    {
      name: "Org. 1"
    },
    {
      name: "Org. 2"
    },
    {
      name: "Org. 3"
    },
    {
      name: "Org. 4"
    },
    {
      name: "Org. 5"
    },
    {
      name: "Org. 6"
    },
    {
      name: "Org. 7"
    },
    {
      name: "Org. 8"
    },
    {
      name: "Org. 9"
    },
    {
      name: "Org. 10"
    },
    // {
    //   name: "Org. 11"
    // },
    // {
    //   name: "Org. 12"
    // },
    // {
    //   name: "Org. 13"
    // },
    // {
    //   name: "Org. 14"
    // },
    // {
    //   name: "Org. 15"
    // },
    // {
    //   name: "Org. 16"
    // }
  ]

  DeleteOrganization(organizationName)
  {
    console.log(`To be deleted organization: ${organizationName}`);
  }

  OpenOrganizationModal(organizationName)
  {
    console.log(`To be opened a modal for organization: ${organizationName}`);
  }

  CreateOrganization(newOrganizationName)
  {
    console.log(`To be created the organization: ${this.newOrganizationName}`);
  }
}
