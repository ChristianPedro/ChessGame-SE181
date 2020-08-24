For this project, we practiced using tools for static analysis, bug-tracking, unit testing and code coverage

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


