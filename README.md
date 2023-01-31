# AREA
EPITECH Project on service-based web and mobile developpement.

# BUILDING
## To create a build version of the project:

### Environment
You need a .env file containing:
`
EXPO_TOKEN=                             # Connection token for expo
MONGO_USERNAME=                         # Username for the mongo connection
MONGO_PASSWORD=                         # Password for the mongo connection
MONGO_DATABASE=                         # Name of the mongo database you're connecting to
MONGO_HOST=                             # Address of the mongo database you're connecting to
DATABASE_TYPE=                          # Connects to 'atlas' by default, you can deploy to a local database by putting anything else
`
----------

After that you only need docker and docker-compose installed

after that run
    docker-compose build
    docker-compose up

if you have issues with it not updating try

    docker-compose up --force-recreate --build -d
    docker image prune -f
