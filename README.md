# Trade-in API

## Auth API
### Signup new account
**URL**
`POST: /v1/auth/signup`

**Params**
```JSON
{
  "username": "Test",
  "email": "test@test.com",
  "password": "12345678",
  "roles": [ "admin" ] // optional, default 'user'
}
```

**Response (status=200)**
```JSON
{
    "message": "User was registered successfully!"
}
```

**Fail**
```JSON
{
    "message": [
        "Username is already in use!",
        "Email is already in use!"
    ]
}
```
```JSON
{
    "message": "Role does not exist!"
}
```


### Login an account
**URL**
`POST: /v1/auth/signin`

**Params**
```JSON
{
    "username": "superadmin",
    "password": "superadmin"
}
```

**Response (status=200)**
```JSON
{
    "id": "5f5fd4554b395b8cff044ce2",
    "username": "superadmin",
    "email": "changeme@changeme.com",
    "roles": [
        "ROLE_SUPER"
    ],
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmNWZkNDU1NGIzOTViOGNmZjA0NGNlMiIsImlhdCI6MTYwMDExNTk0NSwiZXhwIjoxNjAwMTE2MDMxfQ.ffcG8gITvW_7YqwWNdzbLGXZrH54Jk15k3nyb2cA8Tk"
}
```

**Fail**
```JSON
{
    "message": "Invalid Password!"
}
```
```JSON
{
    "message": "User Not found."
}
```

## User pages & roles(test examples)
###Test routes
**URL**

`GET: /v1/test/all` - for public access

`GET: /v1/test/user` - for loggedin users (any role)

**Fail**
```JSON
{
    "message": "No token provided!"
}
```
```JSON
{
    "message": "Unauthorized!"
}
```

`GET: /v1/test/mod` - for moderator users

**Fail**
```JSON
{
    "message": "Require Moderator Role!"
}
```

`GET: /v1/test/admin` - for admin users

**Fail**
```JSON
{
    "message": "Require Admin Role!"
}
```

