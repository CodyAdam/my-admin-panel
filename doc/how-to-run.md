- [Launch it yourself](#launch-it-yourself)
  - [Requirements](#requirements)
  - [Without source code](#without-source-code)
  - [With source code](#with-source-code)
- [Build project and launch](#build-project-and-launch)
  - [Production](#production)
  - [Development](#development)

# Launch it yourself


## Requirements
- Docker
- Docker-Compose

## Without source code
Get into a new folder on your machine, and copy [docker-compose.yml](../docker-compose.yml)\
Execute `docker-compose up`

## With source code
```shell
git clone https://gitlab.istic.univ-rennes1.fr/fgoardou/wm-project
cd wm-project
docker-compose up
```


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
