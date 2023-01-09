- [Requirements](#requirements)
- [From docker hub](#from-docker-hub)
- [Build from source code](#build-from-source-code)
  - [Production](#production)
  - [Development](#development)

# Requirements
- Docker
- Docker-Compose
  
# From docker hub 

Get into a new folder on your machine, and copy [docker-compose.yml](../docker-compose.yml)\
Then execute `docker-compose up`.

Or simply execute the following commands :

```shell
git clone https://gitlab.istic.univ-rennes1.fr/fgoardou/wm-project
cd wm-project
docker-compose up
```

# Build from source code

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
