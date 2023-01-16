# My Admin Panel Project
<p align="middle">
  <img src="/doc/assets/login.png" width=300" />
  <img src="/doc/assets/user.png" width=300" />
  <img src="/doc/assets/swagger.png" width=300" />
  <img src="/doc/assets/dashboard.png" width=300" /> 
  <img src="/doc/assets/rabbitmq.png" width=300" />
  </p>


# TLDR

This is a project for the Web and Architecture course at ESIR.

**The goal** is to create a web application with a microservice architecture. The application is a simple administration panel for a company that manages associations. 

The application is composed of a **front-end**, an **API**, a **mail microservice**, a **database**, a **message broker** and a **reverse proxy**.

# Documentation

- [How to run](./doc/how-to-run.md)
- [Service architecture](./doc/services.md)
- [Front-end technical documentation](./doc/front-end.md)
- [Back-end (API) technical documentation](./doc/back-end.md)

# Project Members

- [ADAM Cody](https://codyadm.com)
- [GOARDOU Fabien](https://fabiengoardou.fr)

# Hosted Demo

You can try the application on our server at:

- [wm.fgdou.ovh/](https://wm.fgdou.ovh/)
- [wm.fgdou.ovh/api/api](https://wm.fgdou.ovh/api/api)
- [wm.fgdou.ovh/maildev/](https://wm.fgdou.ovh/maildev/)
- [wm.fgdou.ovh/rabbitmq/](https://wm.fgdou.ovh/rabbitmq/)
- [wm.fgdou.ovh/grafana/](https://wm.fgdou.ovh/grafana/)
- [wm.fgdou.ovh/prometheus/](https://wm.fgdou.ovh/prometheus/)

> Note : Usernames and passwords for `rabbitmq` and `postgres` are in the [.env](./.env) file.
