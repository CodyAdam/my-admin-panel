# Projet web

# Members
- ADAM Cody
- GOARDOU Fabien


# Requirements
- docker
- docker-compose

# Access online
https://wm.fgdou.ovh/ \
https://wm.fgdou.ovh/api/api \
https://wm.fgdou.ovh/maildev/ \
https://wm.fgdou.ovh/rabbitmq/ \
https://wm.fgdou.ovh/adminer/

# Launch it yourself
## Without source code
Get into a new folder on your machine, and copy [docker-compose.yml](./docker-compose.yml)\
Execute `docker-compose up`
## With source code
```shell
git clone https://gitlab.istic.univ-rennes1.fr/fgoardou/wm-project
cd wm-project
docker-compose up
```

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
Usernames and passwords for rabbitmq and postgres are in the [.env](./.env) file.


# Build project and launch
## Production
If you just want to launch the application with optimal performance, but slow build.

About 1 to 5 min on the first build
```shell
docker-compose -f docker-compose.prod.yml build
docker-compose -f docker-compose.prod.yml up
```

## Development
If you want to build fast and build automatically on file changes
```shell
docker-compose -f docker-compose.dev.yml build
docker-compose -f docker-compose.dev.yml up
```
