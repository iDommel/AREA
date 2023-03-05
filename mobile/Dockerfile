# Build stage
FROM ubuntu:18.04 AS builder

RUN apt update && apt install -y curl git unzip xz-utils zip libglu1-mesa openjdk-8-jdk wget

# Set up new user
RUN useradd -ms /bin/bash developer
USER developer
WORKDIR /home/developer

# Prepare Android directories and system variables
RUN mkdir -p Android/sdk
ENV ANDROID_SDK_ROOT /home/developer/Android/sdk
RUN mkdir -p .android && touch .android/repositories.cfg

# Set up Android SDK
RUN wget -O sdk-tools.zip https://dl.google.com/android/repository/sdk-tools-linux-4333796.zip
RUN unzip sdk-tools.zip && rm sdk-tools.zip
RUN mv tools Android/sdk/tools
RUN cd Android/sdk/tools/bin && yes | ./sdkmanager --licenses
RUN cd Android/sdk/tools/bin && ./sdkmanager "build-tools;29.0.2" "cmdline-tools;latest" "patcher;v4" "platform-tools" "platforms;android-29" "sources;android-29"
ENV PATH "$PATH:/home/developer/Android/sdk/platform-tools"

# Download Flutter SDK
RUN git config --global --add safe.directory /home/developer/flutter
RUN git clone https://github.com/flutter/flutter.git
ENV PATH "$PATH:/home/developer/flutter/bin"

USER root
RUN apt-get update && apt-get install -y apt-utils && apt-get install -y sudo && apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

RUN apt-get update && \
    apt-get install -y openjdk-17-jdk

USER developer

# Run flutter doctor and print output to console
RUN flutter channel stable && flutter upgrade && flutter doctor --android-licenses

# Copy the rest of the files
COPY . /home/developer/app

# Set the working directory
WORKDIR /home/developer/app

# Build the app
USER root
RUN chown -R developer:developer /home/developer/app
# RUN chown developer:developer pubspec.lock .dart_tool/package_config.json
USER developer
RUN flutter build apk --release

# Final stage
FROM ubuntu:18.04

# Set up new user
RUN useradd -ms /bin/bash developer
USER developer
WORKDIR /usr/src/app

# Copy the APK from the builder stage
COPY --from=builder /home/developer/app/build/app/outputs/apk/release/app-release.apk /usr/src/app/apk/app-release.apk
