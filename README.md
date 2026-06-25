# Weather App
Weather App allows checking the weather forecast for a selected city and a single day in the current month or upcoming 5-days.

## Tech Stack
Weather App API based on [Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

Weather App Web based on [CRA](https://create-react-app.dev/) bootstrap with TypeScript template and [MaterialUI](https://material-ui.com/) components.


## Docker usage
The "docker-compose" script creates both API and web app (nginx).
API uses postgres database inside the docker container. 

### Building

```sh
docker-compose build --pull
```

### Running

```sh
docker-compose up
# web - http://localhost
# api - http://localhost:3000
```

## Local usage

### API
API locally uses sqlite database.

#### Installation

```bash
$ yarn
```

#### Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

#### Test

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```

### Web app

#### Installation

```bash
$ yarn
```

#### Running the app

```bash
# development
$ yarn start
```

```bash
# production
$ yarn build
$ yarn global add serve
$ serve -s build
```

#### Test

```bash
# tests
$ yarn test
```

#### Generating API types
Run API locally before running below script. 

```bash
$ yarn generate-swagger-types
```
