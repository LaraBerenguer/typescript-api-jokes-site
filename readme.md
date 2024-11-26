# Typescript jokes generator with API calls

## 📄 Description

A joke generator built with TypeScript to practice API calls and asynchronous programming. This project fetches random jokes from an external API and displays them on the page. Users can rate each joke, and their ratings are stored for reference.

## 💻 Technologies Used

- HTML5
- Typescript
- CSS
- Fetch API

## 🔑 .env configuration

In this case the project provides a key for the exercise. In another type of project this key would have to be provided by the user and the project would include an .env.example. This is just info, no actions are requires!

## 📋 Requirements

- Node.js and npm installed on your system. You can download them from [nodejs.org](https://nodejs.org/).

- Typescript installed on your system.

- One of the features will cause the browser to ask for your location. It may not work on local host. Instructions on how to fix it below.


**✔️ Step 1:** Install npm and project dependencies by running:

```bash
npm install
```

**✔️ Step 2:** Install typescript and project dependencies by running:

```bash
npm i -g typescript
```

**✔️ Step 3:** To compile your ts file to js while you work, run this:

```bash
tsc index.ts -w
```

**✔️ Step 4:** Lauch your local host with the Live Server pluggin or running:

```bash
npm install -g http-server
```
In the correct route path, run:

```bash
http-server
```
And then, select in your console the port you would like to use. It will look something like this:

```bash
Available on:
  http://10.63.1.79:8080
  http://127.0.0.1:8080
```

**✔️ Step 5** Make your location work in Local Host.

*For localhost only (Chrome 119 and above)*
Simply visit this link in your Chrome:

```bash
chrome://flags/#temporary-unexpire-flags-m118
```
You should see highlighted text saying:

```bash
Temporarily unexpire flags that expired as of M118. These flags will be removed soon. – Mac, Windows, Linux, ChromeOS, Android, Fuchsia, Lacros
```

Click Enable Then relauch Chrome.

*For localhost only (Chrome 118 and below)*
Simply visit this link in your Chrome:

```bash
chrome://flags/#allow-insecure-localhost
```

You should see highlighted text saying:

```bash
Allow invalid certificates for resources loaded from localhost
```
Click Enable.

More info in [this link](https://stackoverflow.com/questions/7580508/getting-chrome-to-accept-self-signed-localhost-certificate/12478732).


## ℹ️​ Optional step

Promises might throw an error like this in your debugger.

```bash
error TS2705: An async function or method in ES5 requires the 'Promise' constructor.
```
Consider installing node types to solve it.

```bash
npm install @types/node --save-dev
```

## 🤝 Contributions
If you want to contribute or report issues, feel free to create an issue or submit a pull request.