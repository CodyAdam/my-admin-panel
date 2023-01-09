# Diagram of the services
```mermaid
flowchart LR
    user{{Web Browser}}
    db[("DataBase (Postgres)")]
    quarkus[["Mail server (Quarkus)"]]
    maildev[["MailDev"]]
    mom(["RabbitMQ"])
    proxy[["Proxy (Nginx)"]]
    front[["Front-end (Angular)"]]
    back[["Back-end (NestJS)"]]
    adminer[["Adminer (Database client)"]]
    
    user --> | https://wm.fgdou.ovh \n http://localhost | proxy

    front --> back
    back --> |db| db
    back --> |mom| mom
    quarkus --> |mom| mom
    quarkus --> |smtp| maildev
    adminer --> db
    
    proxy --> | /api/ | back
    proxy --> | / | front
    proxy --> | /rabbitmq/ | mom
    proxy --> | /maildev/ | maildev
    proxy --> | /adminer/ | adminer
```

| Name              | Technology     | Docker Hostname | Url Production                 | Url Dev                    | Source code                                            |
|-------------------|----------------|-----------------|--------------------------------|----------------------------|--------------------------------------------------------|
| Front             | Angular        | front           | https://wm.fgdou.ovh/          | http://localhost/          | [fr-administration-front](../fr-administration-front/) |
| API               | NestJS         | back            | https://wm.fgdou.ovh/api/      | http://localhost/api/      | [fr-administration](../fr-administration/)             |
| Swagger           | Swagger        | back            | https://wm.fgdou.ovh/api/api   | http://localhost/api/api/  | [fr-administration](../fr-administration/)             |
| Mail microservice | Quarkus native | mail            |                                |                            | [mail](../mail/)                                       |
| MailDev           | MailDev        | smtp            | https://wm.fgdou.ovh/maildev/  | http://localhost/maildev/  |                                                        |
| RabbitMQ          | RabbitMQ       | mom             | https://wm.fgdou.ovh/rabbitmq/ | http://localhost/rabbitmq/ |                                                        |
| Adminer (dev)     | Adminer        | adminer         |                                | http://localhost/adminer/  |                                                        |
| Database          | postgres       | db              |                                |                            |                                                        |
| Nginx             | Nginx          | proxy           |                                |                            | [nginx](../nginx/)                                     |

Usernames and passwords for rabbitmq and postgres are in the [.env](../.env) file.