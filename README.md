# Projet web

# Members
- ADAM Cody
- GOARDOU Fabien

# Services
| Name              | Technology     | Url                        | Source code                                           |
|-------------------|----------------|----------------------------|-------------------------------------------------------|
| Front             | Angular        | http://localhost/          | [fr-administration-front](./fr-administration-front/) | 
| API               | NestJS         | http://localhost/api/      | [fr-administration](./fr-administration/)             |
| Swagger           | Swagger        | http://localhost/api/api/  | [fr-administration](./fr-administration/)             |
| Mail microservice | Quarkus native |                            | [mail](./mail/)                                       |
| MailDev           | MailDev        | http://localhost/maildev/  |                                                       |
| RabbitMQ          | RabbitMQ       | http://localhost/rabbitmq/ |                                                       |
| Adminer (dev)     | Adminer        | http://localhost/adminer/  |                                                       |
| Database          | postgres       |                            |                                                       |
| Nginx             | Nginx          |                            | [nginx](./nginx/)                                     |

# Auth
Usernames and passwords for rabbitmq and postgres are in the [.env](./.env) file

# Requirements
- docker
- docker-compose

# Launch
## Production
If you just want to launch the application with optimal performance, but slow build.

About 1 to 5 min on the first build
```shell
docker-compose up
```

## Development
If you want to build fast and build automatically on file changes
```shell
docker-compose -f docker-compose.dev.yml up
```