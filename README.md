# My Admin Panel Project

# TLDR

This is a project for the Web and Mobile course at ESIR.

**The goal** is to create a web application with a microservice architecture. The application is a simple administration panel for a company that manages associations. 

The application is composed of a **front-end**, an **API**, a **mail microservice**, a **database**, a **message broker** and a **reverse proxy**.


## Features

- [x] Login
- [x] Register
- [x] Logout
- [x] Reset password  
- [x] Email on registration
- [x] Users list
- [x] User detail (with association he is in)
- [x] Preview and edit personal information
- [x] Association detail
- [x] Associations list
- [x] Rename association
- [x] Create/remove association
- [x] Add/remove user from association
- [x] Create/remove association event (assign users to event)

# Project Members

- [ADAM Cody](https://codyadm.com)
- [GOARDOU Fabien](https://fabiengoardou.fr)

# Hosted Demo

You can try the application on our server at:

- [wm.fgdou.ovh/](https://wm.fgdou.ovh/)
- [wm.fgdou.ovh/api/api](https://wm.fgdou.ovh/api/api)
- [wm.fgdou.ovh/maildev/](https://wm.fgdou.ovh/maildev/)
- [wm.fgdou.ovh/rabbitmq/](https://wm.fgdou.ovh/rabbitmq/)

> Note : Usernames and passwords for `rabbitmq` and `postgres` are in the [.env](./.env) file.

# Documentation

- [How to run](./doc/how-to-run.md)
- [Service architecture](./doc/services.md)
- [Front-end technical documentation](./doc/front-end.md)
- [Back-end (API) technical documentation](./doc/back-end.md)