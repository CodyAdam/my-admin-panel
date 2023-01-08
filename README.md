# My Admin Panel Project

# TLDR

This is a project for the Web and Mobile course at ESIR. The goal is to create a web application with a microservice architecture. The application is a simple administration panel for a company that manages associations. The application is composed of a front-end, an API, a mail microservice, a database, a message broker and a reverse proxy.

# Project Members

- [ADAM Cody](https://codyadm.com)
- [GOARDOU Fabien](https://fgdou.ovh)

# Hosted Demo

You can try the application on our server at:

- [wm.fgdou.ovh/](https://wm.fgdou.ovh/)
- [wm.fgdou.ovh/api/api](https://wm.fgdou.ovh/api/api)
- [wm.fgdou.ovh/maildev/](https://wm.fgdou.ovh/maildev/)
- [wm.fgdou.ovh/rabbitmq/](https://wm.fgdou.ovh/rabbitmq/)

> Usernames and passwords for rabbitmq and postgres are in the [.env](./.env) file.

# Services List

Each service is running in a isolated container. The services are:

| Name              | Technology     | Url                        | Source code                                           |
| ----------------- | -------------- | -------------------------- | ----------------------------------------------------- |
| Front             | Angular        | http://localhost/          | [fr-administration-front](./fr-administration-front/) |
| API               | NestJS         | http://localhost/api/      | [fr-administration](./fr-administration/)             |
| Swagger           | Swagger        | http://localhost/api/api/  | [fr-administration](./fr-administration/)             |
| Mail microservice | Quarkus native |                            | [mail](./mail/)                                       |
| MailDev           | MailDev        | http://localhost/maildev/  |                                                       |
| RabbitMQ          | RabbitMQ       | http://localhost/rabbitmq/ |                                                       |
| Adminer (dev)     | Adminer        | http://localhost/adminer/  |                                                       |
| Database          | postgres       |                            |                                                       |
| Nginx             | Nginx          |                            | [nginx](./nginx/)                                     |

# Learn More

- [How to run](./doc/how-to-run.md)
- [More about the back-end (API)](./doc/back-end.md)
- []