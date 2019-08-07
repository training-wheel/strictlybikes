# Strictly Bikes

> Native Bike App

Strictly Bikes is an app that's made with exclusively bicycle riders and mind. We allow for pathing to locations based on traffic, road conditions and hazards, or other criteria as well as keep track of user milestones(literally and figuratively)

## Usage

``` bash
# Install dependencies
npm install

Acquire Google OAuth2 credentials for Android and/or iOS 

Create a file in `app/auth` named `config.js`
# 
Define and export `ANDROID_CLIENT_ID` `ANDROID_REDIRECT_URI` and `ANDROID_URL_SCHEME` using the client ID given by Google.

https://console.developers.google.com/

# Build for production
tns build <platform> --bundle

# Build, watch for changes and debug the application
tns debug <platform> --bundle

# Build, watch for changes and run the application
tns run <platform> --hmr

# Build, watch for changes and run the application with emulator
tns run <platform> --hmr --emulator

```

# 
