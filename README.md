# AREA
## EPITECH Project on service-based web and mobile developpement.

## Environnement variables
Create a .env file in the root of the project and add the following variables
```
    DB_HOST=
```
## EndPoints
- [About.json]() - All informations about services and their actions/reaction
- [Client.apk]() - All informations about the mobile APK
- [Auth]() - All informations about the authentification
- [Users]() - All informations about users
- [Workflows]() - All informations about workflows
- [Services]() - All informations about services
- [Services-statuses]() - All informations about services-statuses
- [Actions]() - All informations about actions  
- [Reactions]() - All informations about reactions 




- [Spotify]() - All informations about Spotify services
- [GitHub]() - All informations about GitHub services
- [GitLab]() - All informations about GitLab services
- [Weather]() - All informations about Weather services
- [Time]() - All informations about Time services
- [Microsoft]() - All informations about Microsoft services


## Docker

Area is very easy to install and deploy in a Docker container.
After that you only need docker and docker-compose installed

after that run
```
    docker-compose build
    docker-compose up
```
if you have issues with it not updating try
```
    docker-compose up --force-recreate --build -d
    docker image prune -f
```

Verify the deployment by navigating to your server address in
your preferred browser.

The serveur will run in ```http://localhost:8080``` and the website will be hosted in ```http://localhost:3000``` by default

