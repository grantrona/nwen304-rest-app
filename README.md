# nwen304-rest-app - Chirper

### Group Members:
- Ron
- Dili
- Jeff


A CRUD web-app project for NWEN304 

### Required Steps for Installation
- Install the Firebase CLI via npm by running the following command: <br> <i>npm install -g firebase-tools</i>

## Link to our Web Application hosted on the Cloud
https://chriper-webapp-atel43p7da-uc.a.run.app 


# How to use web app
The Web Application is hosted on Google Cloud and can be accessed through this link: 
- https://chriper-webapp-atel43p7da-uc.a.run.app <br>
The purpose of the web app is to make, edit and delete posts, as well as viewing other's. 
Non-authenticated members can view any post and any user, but cannot edit posts.
Authenticated members can edit, delete and create posts for themselves.
Users can login with email and password or with their Google account. 
Users are timed out after 3 minutes of inactivity (challenge requirement).

# How to use REST API
The REST API has two options, and is built into the server for the app but using a completely separate route. Reading, involves no authentication and reads a certain number of recent posts. Writing involves supplying a username and password, and allows users to write a post tied to their account. 

The web service can be accessed from the `/service` endpoint. 

A GET request to this endpoint will return the latest posts in JSON format. It takes an optional 'count' query that defines how many posts to retrieve (eg. `/service?count=10`), though will default to 5 if not specified.

A POST request to this endpoint will add an aditional post, with specified title and content. The POST request requires an `email`, `password`, `title` and `content` parameters in the request body. The email and password are used to verify the request by logging in.


# Error Handling
Errors are caught in the server, and are sent back in the response to the client. This is for both the web app and the REST api. This generally also prevents the server from ever crashing.

## Web app error handling
Errors are displayed to the user by alerts. Public controller files handle client side requests for events such as logging in, registering, adding posts. Should an error occur during a request, the server will send an appropriate error code. 

## Web service error handling
Error handling is generally handled by sending appropriate error codes in responses. These are usually triggered by catch clauses in promise chains.
Client side javascript checks the status code of the response. If it is ok, it proceeds as intended. If not, a window alert with the server's given message is displayed in the user's browser. All server errors are sent as regular text.

### GET Requests
- If the `count` query parameter is missing, a reasonable default of 5 is used instead.
- If any other error occurs when retrieving the posts from the database, a response is sent to the client with error code 500 (Internal Server Error).
  - These types of errors are unlikely to occur, as the database is just being queried for it's latest posts entries.

### POST Requests
- If **any** of the required body parameters are missing, a 400 error code will be returned. as all of these paramters are needed.
- The serviceLogin function is used to verify the email and password, this is a promise which will return null if verification failed, a check for both null and undefined is used to catch unauthorised credentials, and a 401 error is sent in response.
