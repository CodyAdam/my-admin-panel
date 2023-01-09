# Description

For the backend of our application we opted for a **NestJS** application using **Typescript**. NestJS is a framework for building efficient, scalable Node.js server-side applications. It provide a great REST API structure and a lot of useful features.

We also used **Swagger** to document our API.
And **Postman** combined with NestJS to test our API.
To store our data we used a seperated **Postgres** database that we used through **TypeORM**.

The Swagger interface is available at [wm.fgdou.ovh/api/api](https://wm.fgdou.ovh/api/api).

# Auth

We used **Passport** to handle the authentication. We used the **JWT** strategy to authenticate users. We also used **bcrypt** to hash the passwords.

The authentication is done through the `/auth/login` route. The user must provide his email and password. If the credentials are correct, the user is authenticated and a JWT is returned. This JWT must be used in the `Authorization` header of **every** request to the API.

# Routes

## Default
`GET` /
`POST` /auth/login
`POST` /auth/register

## Users
`GET` /users
`POST` /users
`GET` /users/{id}
`PUT` /users/{id}
`DELETE` /users/{id}
`GET` /users/search/{name}
`POST` /users/byEmail

## Associations
`GET` /associations
`POST` /associations
`GET` /associations/{id}
`PUT` /associations/{id}
`DELETE` /associations/{id}
`GET` /associations/{id}/members
`GET` /associations/search/{name}
`GET` /associations/{id}/minutes

## Roles
`POST` /roles
`GET` /roles
`DELETE` /roles/{user}/{asso}
`PUT` /roles/{user}/{asso}
`GET` /roles/{user}/{asso}
`GET` /roles/{id}
`GET` /roles/userid/{id}
`GET` /roles/users/{name}
`GET` /roles/association/{id}

## Minutes (Association events)
`GET` /minutes
`POST` /minutes
`GET` /minutes/{id}
`PUT` /minutes/{id}
`DELETE` /minutes/{id}


# NestJS Modules

- Associations
- Auth
- Minutes
- Role
- Users