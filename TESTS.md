# Test Cases / Test Scripts

## User Flows (Web Application Front End)
|User Flow|Expected Output|
|---|---|
|Unauthenticated user clicks on home|User seems home page with recent posts. Login and Sign Up buttons in nav bar.|
|Unauthenticated user edits url to enter protected route|User is redirected to error page.|
|User clicks on view author link in post|User redirected to view all posts of selected author in new page. Can also see display name of author. |
|User clicks on login page, enters email and password that is not registered.|Alert is displayed telling user no account exists with email.|
|User clicks on login page, enters email and password that **is** registered.|User is redirected to index page. Nav bar updated with links to extended CRUD functionality.|
|User clicks on login page and logs in with Google account.|User is redirected to index page. Nav bar updated with links to extended CRUD functionality.|
|User clicks on sign up page and enters mismatching passwords.| User is alerted that passwords do not match.|
|User clicks on sign up page and enters valid entries.|User is redirected to index but is not logged in.|
|Authenticated user clicks on **My Post** page.|User enters page with ability to edit and delete all of their posts.|
|Authenticated user clicks on **Add Post** page.|User enters page with ability to add a post.|
|Authenticated user on **Add Post** page, enters title, content, and clicks submit.|User is redirected to home page with their post now showing.|
|Authenticated user on **My Post** page, changes title, content of post and clicks **Submit Edit**.|Page refreshes and title and content of post is updated.|
|Authenticated user on **My Post** page, deletes post.|Page refreshes and post no longer displays.|
|Authenticated user on **Profile** page.|Displays display name and link to change password.|
|Authenticated user on **Profile** page and clicks change password, providing valid email address.|Alerts user to check email for password reset link.|
|User on **Profile** page and clicks change password, providing email address not associated with an account.|Alerts that event cannot occur.|
|User enters new password with provided link.|User can now use new password to login to their account.|
|User tries to enter new password with provided link for a Google account.|User alerted that event cannot occur.|
## Test Cases (Web Application)

## Test Scripts (Web Service)

The following links can be used in the browser, alternatively they can be used in curl or postman, The important factor is that 'count' is used as a query parameter:
- `https://chriper-webapp-atel43p7da-uc.a.run.app/service?count=10`
  - Testing GET request with specified count
- `https://chriper-webapp-atel43p7da-uc.a.run.app/service?count=1`
  - Testing GET request with different count
- `https://chriper-webapp-atel43p7da-uc.a.run.app/service`
  - Testing GET request with no count (defaults to 5)

The following tests were done using postman, but converted to CURL commands:

`curl --location --request POST 'https://chriper-webapp-atel43p7da-uc.a.run.app/service' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "john@test.com",
    "password": "Testing1234@",
    "title": "Fourth post",
    "content": "The variation being the difference between where the missile is, and where it wasn'\''t. If variation is considered to be a significant factor, it too, may be corrected by the GEA"
}'`


`curl --location --request POST 'https://chriper-webapp-atel43p7da-uc.a.run.app/service' \
--header 'Content-Type: application/json' \
--data-raw '{
    // "email": "john@test.com",
    "password": "Testing1234@",
    "title": "Fourth post",
    "content": "The variation being the difference between where the missile is, and where it wasn'\''t. If variation is considered to be a significant factor, it too, may be corrected by the GEA"
}'`


`curl --location --request POST 'https://chriper-webapp-atel43p7da-uc.a.run.app/service' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "john@test.com",
    //"password": "Testing1234@",
    "title": "Fourth post",
    "content": "The variation being the difference between where the missile is, and where it wasn'\''t. If variation is considered to be a significant factor, it too, may be corrected by the GEA"
}'`


`curl --location --request POST 'https://chriper-webapp-atel43p7da-uc.a.run.app/service' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "john@test.com",
    "password": "Testing1234@",
    //"title": "Fourth post",
    "content": "The variation being the difference between where the missile is, and where it wasn'\''t. If variation is considered to be a significant factor, it too, may be corrected by the GEA"
}'`


`curl --location --request POST 'https://chriper-webapp-atel43p7da-uc.a.run.app/service' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "john@test.com",
    "password": "Testing1234@",
    "title": "Fourth post",
    //"content": "The variation being the difference between where the missile is, and where it wasn'\''t. If variation is considered to be a significant factor, it too, may be corrected by the GEA"
}'`

## Performance Test Results for Homepage 
Stress tests conducted through <strong>k6.io</strong> accessing the web-applications homepage (https://chriper-webapp-atel43p7da-uc.a.run.app/):
- <strong>Light load performance (~5 concurrent users, ~5 Reqests per second)</strong>
  - Avg Response Time: 101 ms (Average may be being affected by outliers)
  - Failed request Rate: 0

- <strong>load performance at ~20 concurrent users, ~20 Requests per second:</strong>
  - Avg Response Time: 85ms
  - Failed request Rate: 0

- <strong>Load performance at ~50 concurrent users, ~55 Requests per second:</strong>
  - Avg Response Time: 90ms
  - Failed request Rate: 0


