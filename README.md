# back-office-support

## Prerequisites

### Docker

Install Docker runtime :

- [Docker](https://docs.docker.com/get-docker/)

### Docker compose

Install Docker Compose v2 plugin:

- Docker Compose [v2](https://docs.docker.com/compose/install/)

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

## React Configuration

We use [JSX Control Statements](https://www.npmjs.com/package/babel-plugin-jsx-control-statements) to write
more readable code. There is some configuration needed to use it properly.

Follow the following steps (in this order):

- Installation: see [here](https://www.npmjs.com/package/babel-plugin-jsx-control-statements).
- Configure Babel: see [here](https://dev.to/ansonh/simplest-way-to-install-babel-plugins-in-create-react-app-7i5).
- Finally, configure eslint: see [here](https://vijaysundharapandiyan.medium.com/adding-jsx-control-statements-to-react-app-25a734157534).

**IMPORTANT**: You may have to stop and restart your development to enable it to reload its configuration. During the first setup, we got a lot of errors that went away when we restarted the server.
