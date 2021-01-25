# Reservation App
 ## Table of contents
 - [Description](#description)
 - [Technologies](#technologies)
 - [Team-members](#team-members)
 - [Setup](#setup)
 - [Functionalities](#functionalities)
   - [Register-user](#register-user)
   - [Create-organization](#create-organization)
   - [Reserve-resource](#reserve-resource)
   - [Add-member-to-an-organization](#add-member-to-an-organization)
  - [Implementation-details](#implementation-details)
    - [Ionic-fundamentals](#ionic-fundamentals)
    - [Firebase-fundamentals](#firebase-fundamentals)
    - [Data-structure](#data-structure)
      - [Organizations-object](#organizations-object)
      - [Schedules-object](#schedules-object)
    - [Home-screen](#home-screen)
    - [History-tab](#history-tab)
    - [Schedule-tab](#schedule-tab)
    - [Organization-tab](#organization-tab)
 
 ## Description
 This is an University Project whose purpose is to develop a web application which create and manage reservation timelines for any kind of organization resources in several clicks.
 ## Team members
 This would have not been possible without implication  of:
 * Razvan-Mihai Cursaru - Project Manager and Developer
 * Claudiu Dobos - Developer
 * Andrei Ungureanu - Tester
 * Razvan Munteanu - Tester
 * Stefan Sava - Technical Writer
 
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
 Build for Android
 ```
 $ ionic capacitor run android
 ```
 Build for iOS
 ```
 $ ionic capacitor run ios
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

### Add member to an organization
Validations:
  * The user need to be the owner of the organization
 
![](Readme%20Images/addMember.gif)
 
 

## Implementation details
### Ionic fundamentals
* Ionic apps are made of high-level building blocks called components
* Components allow you to quickly construct an interface for your app.
* Ionic comes with a number of components, including modals, popups, and cards
* For further details, visit: https://ionicframework.com/docs/v3/components/#overview

### Firebase fundamentals
* To store the data we used Firebase
* Firebase is a real-time NoSql Backend as a Service
* It is a key/value store which look like document database
* Is a URL-oriented where there is a unique URL for each piece of data

### Data structure
* All data was stored using a JSON tree
* When we added data to this JSON tree, it automatically become a node in the existing JSON structure with an associated key.
* We defined 2 main objects:
  - organizations
  - schedules
  
#### Organizations object
* Attributes
  - ID - automatically generated, unique identifier
  - name - organization name
  - ownerEmail - key to identify the organization's owner
  - members - array with all organization's members
    - email - member's email
    - permission - __read__  : the member can only see the organization's schedules
                 , __write__ : the member can define new schedules
![](Readme%20Images/img.svg)

#### Schedules object
* Attributes
- ID - automatically generated, unique identifier
- organization name 
- reservation reason
- user email
- startTimestamp 
- endTimestamp 

![](Readme%20Images/schedules.png)
   

### Home screen
There are 2 possible options:
 * Login
   - if the Firebase Auth Service for Login (using the user input credentials) returns true, than the app navigate to targeted URL
   - Else the app will return a warning message saying that the login didn't work properly
 * Register
   - if the Firebase Auth Service for Register (using the user input credentials) returns false, than an insert with the new credentials is made and the app navigat to targeted URL
### History tab
Presents a list of cards with the resource reservation details filtered by the organization
### Schedule tab
Represents an insert form for resources. If the entry is valid it will be inserted in the database, otherwise a warning message will be displayed
### Organization tab
Presents an editable list with all organizations (Actions possible: Insert and Delete)
  



