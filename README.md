# CrowdProcess API Demo

This is a quick demo showing of the [CrowdProcess API](https://www.github.com/crowdprocess/ "CrowdProcess API"). The aim of the demo is to solve a statistical riddle using a Monte Carlo simulation.

## About CrowdProcess

CrowdProcess is a distributed computing platform that runs on top of web browsers. Its much simpler than existing platforms, with the potential to be much more powerful.

## How to use

In order to run this you need to have a valid CrowdProcess Account as well as [NodeJS](http://nodejs.org/ "Install NodeJS") running on your machine.

First you may want to clone this repository and install the required dependencies using the following commands in your terminal:

```bash
$ git clone https://github.com/stigdreyer/crp-api-demo.git
$ npm install
```

Second you have to insert your CrowdProcess Account information into the `index.js` file.

```javascript
AuthClient.login('email', 'password', function(err, credential) {
```

Finally, to start the demo run the following command in your terminal:

```bash
$ node index.js
```

## Customize

I can think of two possibilities for you to customize this demo. First you can play around with the following two variables in the `index.js` file:

```javascript
var computations = 10;
var trials = 1000000;
```

Second, feel free to add your own riddle calculations to the `lib` folder. Currently there is no other way to change the console log apart from the `index.js` file.

## The riddle

### Loaded Revolver

Henry has been caught stealing cattle, and is brought into town for justice. The judge is his ex-wife Gretchen, who wants to show him some sympathy, but the law clearly calls for two shots to be taken at Henry from close range. To make things a little better for Henry, Gretchen tells him she will place two bullets into a six-chambered revolver in successive order. She will spin the chamber, close it, and take one shot. If Henry is still alive, she will then either take another shot, or spin the chamber again before shooting.

Henry is a bit incredulous that his own ex-wife would carry out the punishment, and a bit sad that she was always such a rule follower. He steels himself as Gretchen loads the chambers, spins the revolver, and pulls the trigger. Whew! It was blank. Then Gretchen asks, "Do you want me to pull the trigger again, or should I spin the chamber a second time before pulling the trigger?"

What should Henry choose?

(Source: http://www.braingle.com/brainteasers/20227/loaded-revolver.html)