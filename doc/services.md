# Diagram of the services
```mermaid
flowchart LR
    user{{Web Browser}}
    
    subgraph "Internal docker network"
        db[("DataBase (Postgres)")]
        quarkus[["Mail server (Quarkus)"]]
        maildev[["MailDev"]]
        mom(["RabbitMQ"])
        proxy[["Proxy (Nginx)"]]
        front[["Front-end (Angular)"]]
        back[["Back-end (NestJS)"]]
        adminer[["Adminer (Database client)"]]
    end
    
    user --> | https://wm.fgdou.ovh \n http://localhost | proxy

    front .-> | /api/ | back
    back --> |db| db
    back --> |mom| mom
    quarkus --> |mom| mom
    quarkus --> |smtp| maildev
    adminer --> db
    
    proxy --> | /api/ | back
    proxy --> | / | front
    proxy .-> | /rabbitmq/ | mom
    proxy --> | /maildev/ | maildev
    proxy --> | /adminer/ | adminer 
```

The dots links are specials links, not useful to actually run the services :
- The front / back link do not really exist. The front on the web-browser call the `/api` location and is redirected through `nginx` directly on the backend.
- The rabbitMQ link exist, but is only here to connect to the management plugin of RabbitMQ. It is not used by any services, just by the user for debug.

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