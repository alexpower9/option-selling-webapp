# option-seller-webapp
# what is this project?

This project is a web app, built with Vue.js, that aims to simulate options trading using real-time financial data. The goal is to have this be a suitable solution for people who want to practice their options trading strategies without risking real money. Often times, simulating options trading on various platforms can prove complicated, and is often including with trading of other financial instruments. The whole purpose of this project is to provide a simple, easy to understand interface to practice options trading on its own. While this site does contain some information regarding a specificed underlying, it is not meant as a research tool, but rather exists to simply manage and execute trades.

## Why this over other options?

While simplicity was a focus, my main goal was to include a multiple account feature. The idea is that, as a trader, it should be easy for me to try and compare various strategies under one interface. For example, you may have "account" dedicated to selling vertical spreads, while another is for going long on a call options. By easily being able to compare and constrast the results, users will hopefully become more equipped to trade in the real world. 

## There are only a select number of stocks able to be traded. Why is this?

One of my favourite strategies is selling vertical spreads on blue chip stocks, so I dediced that this would be the most effective place for me to start. As I also do this with real money, it made more since for me to start here. In the future, I may look into adding a larger catalog of underlying that could be traded. Also, with API calls being expensive, this was a better much strategy.

## How can I operate this to try it for myself?

1. **Step 1**: Clone the repository to your local machine.
    ```
    git clone https://github.com/alexpower9/option-selling-webapp.git
    ```
2. **Step 2**: Ensure Node.js is installed on your local machine

3. **Step 3**: Create a .env file in the root directory of the project. Create a variable called "VUE_APP_API_KEY". Then head over to https://www.marketdata.app/ and obtain an api key. The final product should look like this.
    ```
    VUE_APP_API_KEY=your_api_key
    ```
4. **Step 4**: Run the project, which starts the local server on port 3000 and the Vue.js web app on port 8080
    ```
    npm run dev
    ```
