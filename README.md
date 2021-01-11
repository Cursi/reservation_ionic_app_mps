# Reservation App
 ## Table of contents
 - [Description](#description)
 - [Technologies](#technologies)
 - [Setup](#setup)
 - [Functionalities](#functionalities)
   - [Register-user](#register-user)
   - [Create-organization](#create-organization)
   - [Reserve-resource](#reserve-resource)]
 
 ## Description
 This is an University Project whose purpose is to develop a web application which create and manage reservation timelines for any kind of organization resources in several clicks.
 ## Technologies
 Project is created with
 * HTML5
 * CSS3
 * SASS
 * JavaScript
 * TypeScript
 * Angular 10
 * Firebase
 * Ionic
 ## Setup
 To run this project, use the following commands:
 ```
 $ git clone git@github.com:Cursi/reservation_ionic_app_mps.git
 $ cd Scheduler
 $ npm install
 $ ionic serve
 ```
 Build for android
 ```
 $ ionic capacitor run android
 ```
 ## Functionalities
 ### Register user
 Validations:
 * The username format: "username@example.com"
 
 ![](Readme%20Images/registerUser.gif)
 
### Create organization
Validations:
* The organization name must be unique

![](Readme%20Images/createOrganization.gif)

### Reserve resource
Validations:
 * End date must be higher than the start date
 * The reservation does not intersect with any of other booked intervals
 * Start date must be in the future

![](Readme%20Images/reserveResource.gif)

