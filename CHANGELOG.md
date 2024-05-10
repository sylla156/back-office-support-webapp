# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [1.4.2-2](https://gitlab.com/connekt4/back-office-support-webapp/compare/v1.4.2-1...v1.4.2-2) (2024-05-10)

### [1.4.2-1](https://gitlab.com/connekt4/back-office-support-webapp/compare/v1.4.2-0...v1.4.2-1) (2024-05-10)


### Bug Fixes

* otp typo in SignIn and VerifyAuth components ([5c9cef8](https://gitlab.com/connekt4/back-office-support-webapp/commit/5c9cef814aa3223c714087be1bd6431d382f7353))

### [1.4.2-0](https://gitlab.com/connekt4/back-office-support-webapp/compare/v1.4.1...v1.4.2-0) (2024-01-15)

### [1.4.1](https://gitlab.com/connekt4/back-office-support-webapp/compare/v1.4.0...v1.4.1) (2024-01-03)


### Bug Fixes

* **retour-de-fonds:** fixing errors and bugs during functionality testing ([57b1345](https://gitlab.com/connekt4/back-office-support-webapp/commit/57b1345969635a9363225d3987441ab1ed2b8413))
* **return-of-funds-route:** extract returns in excel format ([337c6e8](https://gitlab.com/connekt4/back-office-support-webapp/commit/337c6e842eaffe7e7e494836d98eab2ca31442af))

## [1.4.0](https://gitlab.com/connekt4/back-office-support-webapp/compare/v1.4.0-0...v1.4.0) (2023-11-21)


### Features

* **FILE_LIMIT:** Added env var to set max body size ([0d120ad](https://gitlab.com/connekt4/back-office-support-webapp/commit/0d120ada9ae1bd40566be9e84d03f4c5e5813dd0))


### Bug Fixes

* **container:** Updated perms on files & dirs ([4e4745f](https://gitlab.com/connekt4/back-office-support-webapp/commit/4e4745f2ccb2ceff4cee4dc330a7762cb1a6b92e))

## [1.4.0-0](https://gitlab.com/connekt4/back-office-support-webapp/compare/v1.3.5...v1.4.0-0) (2023-11-21)


### Features

* **retour de fonds:** Adding and displaying returns ([c15f0d6](https://gitlab.com/connekt4/back-office-support-webapp/commit/c15f0d6a7a4f658ea208e1e95047d41da04e4cd7))
* **retour de fonds:** return of funds logs ([5f48dda](https://gitlab.com/connekt4/back-office-support-webapp/commit/5f48dda677b018830f689de7b09224d7031ec8a9))

### [1.3.5](https://gitlab.com/connekt4/back-office-support-webapp/compare/v1.3.4...v1.3.5) (2023-11-13)


### Bug Fixes

* **Env vars:** Added .env.production to /app for build time. ([1891377](https://gitlab.com/connekt4/back-office-support-webapp/commit/189137792e4e21998f19230cf470aa074f4420f0))

### [1.3.4](https://gitlab.com/connekt4/back-office-support-webapp/compare/v1.3.3...v1.3.4) (2023-11-13)


### Bug Fixes

* **Env vars:** Updated Dockerfile to take build args ([4f73993](https://gitlab.com/connekt4/back-office-support-webapp/commit/4f739935a2965975d60a4294b005f58527c18d27))

### [1.3.3](https://gitlab.com/connekt4/back-office-support-webapp/compare/v1.3.2...v1.3.3) (2023-11-10)


### Bug Fixes

* **deployment:** Updated registry image reference in K8s deployment ([16c4722](https://gitlab.com/connekt4/back-office-support-webapp/commit/16c47223846497c22916a68741056baa779d178c))

### [1.3.2](https://gitlab.com/connekt4/back-office-support-webapp/compare/v1.3.1...v1.3.2) (2023-11-10)


### Bug Fixes

* **env:** Fixed wrong filename .env.prod to .env.production ([dc96a3e](https://gitlab.com/connekt4/back-office-support-webapp/commit/dc96a3e4aeb77e6e2dca52de5b92dae2cfd5a6b4))

### [1.3.1](https://gitlab.com/connekt4/back-office-support-webapp/compare/v1.3.0...v1.3.1) (2023-11-10)

## 1.3.0 (2023-11-10)


### Features

* **.env.dist:** Added infra/config/.env.dist file ([f6f40db](https://gitlab.com/connekt4/back-office-support-webapp/commit/f6f40db488eb1013c73104b75434652ff031ecfd))
* **clean:** Removed Google's UTM tag in start_url ([363dd00](https://gitlab.com/connekt4/back-office-support-webapp/commit/363dd00d1e229ea0aba3259cc356b2db6bbc062a))
* **clean:** Removed screenshot of Hub2 logo ([9f41f82](https://gitlab.com/connekt4/back-office-support-webapp/commit/9f41f823729f2aebbcbdf52eb6fa9c013ce429d3))
* **deployment.tmpl:** Added K8s deployment template file for CI pipelines ([14c0397](https://gitlab.com/connekt4/back-office-support-webapp/commit/14c0397aa4b054b728cd79ee081c496cd2b9b09f))
* **Docker:** Added the necessary files for a working Docker integration ([51c7271](https://gitlab.com/connekt4/back-office-support-webapp/commit/51c7271310f2c910715ab7d2afc1f14cc68811a6))
* **Docker:** Added the necessary files for a working Docker integration ([d77b858](https://gitlab.com/connekt4/back-office-support-webapp/commit/d77b8581cedd0741c005e2f4b36ca97d1efbbad3))
* **package.json:** Updated npm scripts to follow project Dockerization + Removed proxy ([097ee11](https://gitlab.com/connekt4/back-office-support-webapp/commit/097ee1110ed3c571c3f5ee1ad10343bd6d99e4cf))
* **package.json:** Updated npm scripts to follow project Dockerization + Removed proxy ([1fc90c4](https://gitlab.com/connekt4/back-office-support-webapp/commit/1fc90c48a9bd5732ae1031c2e57517613e6c9969))
* **README:** Updated file with all the necessary info ([d128e55](https://gitlab.com/connekt4/back-office-support-webapp/commit/d128e5523165faa7981f3bcb2f7c3d5eb295a3d4))
* **README:** Updated file with all the necessary info ([555a446](https://gitlab.com/connekt4/back-office-support-webapp/commit/555a4463667c4aefb8dd0eb510afd6c3baa8685a))
* Make run the docker container ([e6403ad](https://gitlab.com/connekt4/back-office-support-webapp/commit/e6403ad959846a96862b4626e5efe4f1001364fe))
* **sonarqube:** Added SonarQube project properties ([f213d30](https://gitlab.com/connekt4/back-office-support-webapp/commit/f213d3068821b575679767f95a44216bc556c085))


### Bug Fixes

* **package.json:** Updated project information in package.json ([dc9d452](https://gitlab.com/connekt4/back-office-support-webapp/commit/dc9d4527001cb5d9aa40b83a8925a4f6224fc464))
* **robots.txt:** Added Disallow / for all ([3d9f93e](https://gitlab.com/connekt4/back-office-support-webapp/commit/3d9f93efda22a9cdc1e3c7381db92952d6f655ad))
* change the eslint rule for make the lint right ([8e644d6](https://gitlab.com/connekt4/back-office-support-webapp/commit/8e644d69de1dc5f62fe68eb4f37b46334143c508))
* i add the env var for update the axios helper file ([6f66130](https://gitlab.com/connekt4/back-office-support-webapp/commit/6f661302f8d3b43bb94abf9fcfbfebd24729fccb))

## [1.2.0](https://gitlab.com/connekt4/back-office-support/compare/v1.2.0-0...v1.2.0) (2023-11-03)

## [1.2.0-0](https://gitlab.com/connekt4/back-office-support/compare/v1.1.0...v1.2.0-0) (2023-11-03)


### Features

* **clean:** Removed Google's UTM tag in start_url ([363dd00](https://gitlab.com/connekt4/back-office-support/commit/363dd00d1e229ea0aba3259cc356b2db6bbc062a))
* **clean:** Removed screenshot of Hub2 logo ([9f41f82](https://gitlab.com/connekt4/back-office-support/commit/9f41f823729f2aebbcbdf52eb6fa9c013ce429d3))
* **sonarqube:** Added SonarQube project properties ([f213d30](https://gitlab.com/connekt4/back-office-support/commit/f213d3068821b575679767f95a44216bc556c085))
* Make run the docker container ([e6403ad](https://gitlab.com/connekt4/back-office-support/commit/e6403ad959846a96862b4626e5efe4f1001364fe))


### Bug Fixes

* **robots.txt:** Added Disallow / for all ([3d9f93e](https://gitlab.com/connekt4/back-office-support/commit/3d9f93efda22a9cdc1e3c7381db92952d6f655ad))
* change the eslint rule for make the lint right ([8e644d6](https://gitlab.com/connekt4/back-office-support/commit/8e644d69de1dc5f62fe68eb4f37b46334143c508))

## 1.1.0 (2023-04-14)


### Features

* **.env.dist:** Added infra/config/.env.dist file ([f6f40db](https://gitlab.com/connekt4/back-office-support/commit/f6f40db488eb1013c73104b75434652ff031ecfd))
* **deployment.tmpl:** Added K8s deployment template file for CI pipelines ([14c0397](https://gitlab.com/connekt4/back-office-support/commit/14c0397aa4b054b728cd79ee081c496cd2b9b09f))
* **Docker:** Added the necessary files for a working Docker integration ([d77b858](https://gitlab.com/connekt4/back-office-support/commit/d77b8581cedd0741c005e2f4b36ca97d1efbbad3))
* **Docker:** Added the necessary files for a working Docker integration ([51c7271](https://gitlab.com/connekt4/back-office-support/commit/51c7271310f2c910715ab7d2afc1f14cc68811a6))
* **package.json:** Updated npm scripts to follow project Dockerization + Removed proxy ([1fc90c4](https://gitlab.com/connekt4/back-office-support/commit/1fc90c48a9bd5732ae1031c2e57517613e6c9969))
* **package.json:** Updated npm scripts to follow project Dockerization + Removed proxy ([097ee11](https://gitlab.com/connekt4/back-office-support/commit/097ee1110ed3c571c3f5ee1ad10343bd6d99e4cf))
* **README:** Updated file with all the necessary info ([d128e55](https://gitlab.com/connekt4/back-office-support/commit/d128e5523165faa7981f3bcb2f7c3d5eb295a3d4))
* **README:** Updated file with all the necessary info ([555a446](https://gitlab.com/connekt4/back-office-support/commit/555a4463667c4aefb8dd0eb510afd6c3baa8685a))


### Bug Fixes

* **package.json:** Updated project information in package.json ([dc9d452](https://gitlab.com/connekt4/back-office-support/commit/dc9d4527001cb5d9aa40b83a8925a4f6224fc464))
