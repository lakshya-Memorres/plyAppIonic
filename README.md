# Ply Mobile App Setup Guide
Welcome to the Ply Mobile App development team! This guide will walk you through the process of setting up the pre-existing Ply Mobile App for new developers. The Ply Mobile App is built using the Ionic framework with Cordova.

## Prerequisites
Before you begin, ensure you have met the following requirements:

1. nvm (Node Version Manager) installed. If not, you can install it by following the instructions at nvm [GitHub Repository](https://github.com/nvm-sh/nvm).

2. Ionic CLI and Cordova installed.

## Node.js Setup with nvm

1. Install Node.js version 10.19 using nvm:
`nvm install 10.19`

2. Use Node.js version 10.19 for this project:
`nvm use 10.19`

3. Verify the Node.js version. This should display `v10.19.0`:
`node --version`

## Installation

1. Clone the repo
`git clone git@bitbucket.org:tepee-web/ply-app-2.0.git`

2. Navigate to the project directory:
`cd ply-app-2.0`

2. Inside the project directory intstall the dependencies
`npm install`


## Configuring Cordova

1. Add the desired platform (e.g., iOS or Android):
`ionic cordova platform add ios`
or 
`ionic cordova platform add android`

2. To build the project, run:
`ionic cordova prepare ios`
or 
`ionic cordova prepare android`

## Running the Project

1. To run the project on a device or an emulator on android import the `android folder` into android studio
or 
For ios import the `Ply.Life.xcworkspace`` found in the platform -> ios folder into xcode.

2. To run the app in a browser:
`ionic serve`

## Support
For help or more information, refer to the Ionic documentation at [Ionic Docs](https://ionicframework.com/docs) or the Cordova documentation at [Cordova Docs](https://cordova.apache.org/docs/en/latest/).

# plyAppIonic
