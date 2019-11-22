# Luffypass 2.0 POC Mobile App

## 🔨 Local test build 
1. Pull repository to a local drive
2. Execute `npm install expo-cli --global` to get the command-line interface for EXPO
3. Execute `npm install` to download the required libaries by the mobile applications 
4. Execute `npm run start` or `expo start` to build the application locally
5. Open browser to `http://localhost:19002` 
6. Run the mobile expo app to scan the QR in the browser

## 🗺 Project Layout 
- [`src`](/src) The source code for the mobile app build using react native 
- [`scripts`](/scripts) Contains additional scripts for CI/CD purposes
- [`docs`](/docs) Documentation about app structure and logic


## 🎆 Automatic Master Branch Build

To access the build in the master branch, download the EXPO Mobile app and scan the following QR code:
![Expo QR](https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=exp://exp.host/@workpasssg/sg-workpass)
