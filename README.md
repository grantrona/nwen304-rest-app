# nwen304-rest-app - Chirper

### Group Members:
- Ron
- Dili
- Jeff



A CRUD web-app project for NWEN304 

### Required Steps for Installation
- Install the Firebase CLI via npm by running the following command: <br> <i>npm install -g firebase-tools</i>


# How to use web app
The purpose of the web app is to make, edit and delete posts, as well as viewing other's. 
Non-authenticated members can view any post and any user, but cannot edit posts.
Authenticated members can edit, delete and create posts for themselves.
Users can login with email and password or with their Google account. 
Users are timed out after 3 minutes of inactivity (challenge requirement).

# How to use REST API
The REST API has two options, and is built into the server for the app but using a completely separate route.
 Reading, involves no authentication and reads a certain number of recent posts. 
Writing involves supplying a username and password, and allows users to write a post tied to their account. 


# Error Handling
Errors are caught in the server, and are sent back in the response to the client. This is for both the web app and the REST api. This generally also prevents the server from ever crashing. 