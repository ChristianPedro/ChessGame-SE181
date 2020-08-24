For this project, we practiced using tools for static analysis, bug-tracking, unit testing and code coverage
# Testing
# Static Analysis (Linter)
This project uses ESLint as the static analysis tool. 

Getting started:

```
npm install eslint --save-dev
  
    or

yarn add eslint --dev
```
.eslintrc.json is the configuration file present in the main directory. If the configuration file is missing, enter
this command

```
npx eslint --init
```

To perform the analysis, enter the following command:
```
npx eslint yourfile.js
```
in place of 'yourfile.js' enter the name of the file you would like to analyze

# Code Coverage (Jest)
This project uses Jest to do unit testing, and to give code coverage reports

Jest gets installed along with all the other dependencies, however, if it isnt installed, run the following command

```
npm install --save-dev jest
```
 and makes sure package.json file contains the follwoing part to its script
 ```
 {
  "scripts": {
    "test": "jest"
  }
}
 ```
 
 The test files are in the main directory and are named as 
 
 'nameOfFunctionToTest'.test.js
 
 All required functions have been tested and the test cases can be found in their respective file
 
# Bug Tracking (TrackJS)
This project was built using TrackJS features to fix bugs. 

TrackJS doesn't have an dependencies. 
TrackJS is expected to get installed along with other dependencies, however if it doesn't get installed:
1. run the command:
```
npm install trackjs --save
```
2. add the following lines to app.js for its installation

```
// ES6 Modular JavaScript.
// npm install trackjs --save

import { TrackJS } from "trackjs";
TrackJS.install({
  token: "YOUR_TOKEN"
});
TrackJS.track('Error')
```
A complete report of the bugs appear on the dashboard on your TrackJS account.
