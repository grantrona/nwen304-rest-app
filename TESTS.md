# Test Cases / Test Scripts

## Test Cases (Web Application)

## Test Scripts (Web Service)

The following links can be used in the browser, alternatively they can be used in curl or postman, The important factor is that 'count' is used as a query parameter:
- `http://localhost:3000/service?count=10`
  - Testing GET request with specified count
- `http://localhost:3000/service?count=1`
  - Testing GET request with different count
- `http://localhost:3000/service`
  - Testing GET request with no count (defaults to 5)

The following tests were done using postman, but converted to CURL commands:

`curl --location --request POST 'http://localhost:3000/service' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "john@test.com",
    "password": "Testing1234@",
    "title": "Fourth post",
    "content": "The variation being the difference between where the missile is, and where it wasn'\''t. If variation is considered to be a significant factor, it too, may be corrected by the GEA"
}'`


`curl --location --request POST 'http://localhost:3000/service' \
--header 'Content-Type: application/json' \
--data-raw '{
    // "email": "john@test.com",
    "password": "Testing1234@",
    "title": "Fourth post",
    "content": "The variation being the difference between where the missile is, and where it wasn'\''t. If variation is considered to be a significant factor, it too, may be corrected by the GEA"
}'`


`curl --location --request POST 'http://localhost:3000/service' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "john@test.com",
    //"password": "Testing1234@",
    "title": "Fourth post",
    "content": "The variation being the difference between where the missile is, and where it wasn'\''t. If variation is considered to be a significant factor, it too, may be corrected by the GEA"
}'`


`curl --location --request POST 'http://localhost:3000/service' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "john@test.com",
    "password": "Testing1234@",
    //"title": "Fourth post",
    "content": "The variation being the difference between where the missile is, and where it wasn'\''t. If variation is considered to be a significant factor, it too, may be corrected by the GEA"
}'`


`curl --location --request POST 'http://localhost:3000/service' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "john@test.com",
    "password": "Testing1234@",
    "title": "Fourth post",
    //"content": "The variation being the difference between where the missile is, and where it wasn'\''t. If variation is considered to be a significant factor, it too, may be corrected by the GEA"
}'`


