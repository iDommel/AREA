# AREA
## EPITECH Project on service-based web and mobile developpement.

## Environnement variables
Create a .env file in the root of the project and add the following variables
```
    DB_HOST=
```
## EndPoints
- [About.json](https://documenter.getpostman.com/view/25947455/2s93JnV7Tf#8e98ef40-a04b-4f80-a441-9124df8b3a01) - All informations about services and their actions/reaction
- [Client.apk](https://documenter.getpostman.com/view/25947455/2s93JnV7Tf#e76336eb-12bd-44d2-833f-a9f06a7198dd) - All informations about the mobile APK
- [Auth](https://documenter.getpostman.com/view/25947455/2s93JnV7Tf#e3ee921f-0450-4886-98eb-61ae63864dbb) - All informations about the authentification
- [Users](https://documenter.getpostman.com/view/25947455/2s93JnV7Tf#7d93fd4f-55e9-4cd8-9118-672dbbc9d329) - All informations about users
- [Workflows](https://documenter.getpostman.com/view/25947455/2s93JnV7Tf#eb9729c1-59c5-4e30-9e11-6842a39c55c9) - All informations about workflows
- [Services](https://documenter.getpostman.com/view/25947455/2s93JnV7Tf#a112aa74-b557-4f43-88f3-4bc19bd65035) - All informations about services
- [Services-statuses](https://documenter.getpostman.com/view/25947455/2s93JnV7Tf#d7111bd7-df93-47e9-8767-66d091c289c5) - All informations about services-statuses
- [Actions](https://documenter.getpostman.com/view/25947455/2s93JnV7Tf#c5d00fa9-c5f0-411f-a5ea-38a2fcb05a1b) - All informations about actions  
- [Reactions](https://documenter.getpostman.com/view/25947455/2s93JnV7Tf#c57238c0-c5c7-4341-ad90-3ecc56ed150e) - All informations about reactions 
- [Spotify](https://documenter.getpostman.com/view/25947455/2s93JnV7Tf#c36942ba-b5ec-48ed-bc9e-d08cc8c0b079) - All informations about Spotify services
- [GitHub](https://documenter.getpostman.com/view/25947455/2s93JnV7Tf#fefdbe6a-5c6e-4478-ae83-8452589d0fd3) - All informations about GitHub services
- [GitLab](https://documenter.getpostman.com/view/25947455/2s93JnV7Tf#26cc6401-0eee-4c7b-b987-febc8d54e478) - All informations about GitLab services
- [Weather](https://documenter.getpostman.com/view/25947455/2s93JnV7Tf#bf9b5e8c-5510-4bf4-b5d3-3c23287e89ca) - All informations about Weather services
- [Time](https://documenter.getpostman.com/view/25947455/2s93JnV7Tf#0fb5f9b7-482b-4fa0-a44e-d5c072719da1) - All informations about Time services
- [Microsoft](https://documenter.getpostman.com/view/25947455/2s93JnV7Tf#81986536-12b0-411a-8dc8-c8874f5980e7) - All informations about Microsoft services


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

