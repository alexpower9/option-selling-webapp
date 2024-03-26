# option-seller-webapp
# what is this project?

This project is a web app, built with Vue.js, that aims to simulate options trading using real-time financial data. The goal is to have this be a suitable solution for people who want to practice their options trading strategies without risking real money. Often times, simulating options trading on various platforms can prove complicated, and is often including with trading of other financial instruments. The whole purpose of this project is to provide a simple, easy to understand interface to practice options trading on its own. While this site does contain some information regarding a specificed underlying, it is not meant as a research tool, but rather exists to simply manage and execute trades.

## Why this over other options?

While simplicity was a focus, my main goal was to include a multiple account feature. The idea is that, as a trader, it should be easy for me to try and compare various strategies under one interface. For example, you may have "account" dedicated to selling vertical spreads, while another is for going long on a call options. By easily being able to compare and constrast the results, users will hopefully become more equipped to trade in the real world. 

## There are only a select number of stocks able to be traded. Why is this?

One of my favourite strategies is selling vertical spreads on blue chip stocks, so I dediced that this would be the most effective place for me to start. As I also do this with real money, it made more since for me to start here. In the future, I may look into adding a larger catalog of underlying that could be traded. Also, with API calls being expensive, this was a better much strategy.

## How can I operate this to try it for myself?

First, ensure node is installed on your machine. Then, create a .env file, and write "VUE_APP_API_KEY=". Go to marketdata.app and obtain your api key, and set this env variable equal to it as a string. Then, run npm install to ensure all dependencies are installed on your machine. When this is completed, run "npm run dev", which will start the local server (for now atleast) and display your link to the web app being hosted locally. Here, you should be able to do things such as create an account, create sub accounts, and begin trading. 
