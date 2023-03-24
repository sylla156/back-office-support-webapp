# back-office-support

## Prerequisites

### Docker

Install Docker runtime :

- Docker (https://docs.docker.com/get-docker/)


### Docker compose

Install Docker Compose v2 plugin : 
- Docker Compose : https://docs.docker.com/compose/install/

**IMPORTANT** : We recommend using Docker Compose >= v2.x, as v1 is deprecated.

---

Local development is backed by a Docker compose file (`infra/deploy/local/docker-compose.yml`). 
The things you have to know about that file is :

- The project directory (on the Dev's computer) is bind mounted into the container to allow hot reloading features.
- Local container user is `root`.
- A default listen port has been defined to access the application through localhost : `http://127.0.0.1:3400`

Have a look at the file to see all its features.


### Packages

The first to know is that all dev-related commands are managed/handled by the `make` command. You must have this tool on your system.

For Linux users, it is recommended to use the `build-essentials` package, but you might only install the `make` tool.

```shell

# Debian-based distributions :
apt update
apt install build-essentials
```


For MacOS users, install `xcode` command line tools

```shell
brew install xcode
```




## Build the project

```shell
make build

# Or, to build by not using Docker cache :
make clean-build
```

## Start the project in "watch-mode"

```shell
make run

# You can then check that the container is running :
docker container ls
```
