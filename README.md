# AREA
EPITECH Project on service-based web and mobile developpement.

# BUILDING
## To create a build version of the project, run the following:


You need a .env file containing you expo credentials such as:
`
EXPO_USERNAME=
EXPO_PASSWORD=
`
----------



After that you only need docker and docker-compose installed

after that run

    docker-compose up

if you have issues with it not updating try

    docker-compose up --force-recreate --build -d
    docker image prune -f
