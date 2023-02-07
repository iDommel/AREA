# pull base image
FROM reactnativecommunity/react-native-android:6.1

ARG EXPO_TOKEN

ENV EXPO_TOKEN=$EXPO_TOKEN

WORKDIR /usr/src/app

RUN env

RUN apt-get update

RUN apt-get install -y jq wget

COPY package*.json eas.json ./

RUN npm install

RUN npm install -g eas-cli@latest expo-cli@latest

COPY . ./

# RUN npx expo login

# TODO re add the build
# RUN eas build --platform=android --non-interactive
# 0JS30nmD8-Vfy9cLFcIcZ6nFW3iXTmyoTLIBZc_7
RUN eas build:list --json --non-interactive --limit=1 --platform=android | jq  '.[0].artifacts.buildUrl'

RUN wget -P ./apk $(eas build:list --json --non-interactive --limit=1 --platform=android | jq -r '.[0].artifacts.buildUrl')

CMD ["ls", "-la", "./apk"]