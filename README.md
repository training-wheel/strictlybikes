# Scatter

> Native Bike App

## Usage
Scatter is an alley-cat-style bicycle racing game. Players choose a game mode, being classic Alley Cat, Time Attack, or Team games and collect markers around the area. Collect badges and challenge other racers.


# Install dependencies
npm install

# Globally install NativeScript
npm install -g nativescript

# Follow the remaining setup at https://docs.nativescript.org/start/quick-setup


# Acquire Google OAuth2 credentials for Android and/or iOS 

Create a file in `app` directory named `config.js`

Define and export `ANDROID_CLIENT_ID` `ANDROID_REDIRECT_URI` and `ANDROID_URL_SCHEME` using the client ID given by Google Developer

https://console.developers.google.com/

# Mapbox Setup
Acquire an API key from https://www.mapbox.com/

Set the API key as a variable in the `config.js` file 

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
