<template>
<!--This component will have the following 4 indices: S&P 500, NASDAQ, DOW30 and RUSSELL2000-->
<!--Not sure if the api calls should be done from here or the stock page component tbh-->
<h1>The current price of the S&P is {{ this.currentPrice.sp500 }}</h1>
<h1>The change in percentage from the previous day is {{ this.previousClosePercentage.sp500 }}</h1>
</template>

<script>

import axios from 'axios';

export default {
    name: 'IndexDisplay',
    data() {
        return {
            currentPrice : {
                sp500: null,
                nasdaq: null,
                dow30: null,
                russell2000: null
            },
            previousClosePercentage : {
                sp500: null,
                nasdaq: null,
                dow30: null,
                russell2000: null
            }
        }
    },
    //make seperate calls for each index we are going to be using
    methods : {
        fetchCurrentPrices() {
           for(let key in this.currentPrice) {
            this.currentPrice[key] = null;
           }
           for(let key in this.previousClosePercentage) {
            this.previousClosePercentage[key] = null;
           }

           let API_KEY = process.env.VUE_APP_API_KEY;
           this.fetchSP(API_KEY);
           this.fetchDow(API_KEY);
           this.fetchNasdaq(API_KEY);
           this.fetchRussell(API_KEY);
           
        },
        fetchSP(API_KEY) {
            axios.get("https://api.marketdata.app/v1/indices/quotes/VIX/", {
                headers: {
                    "Authorization" : "Bearer " + API_KEY
                }
            })
            .then(response => {
                this.currentPrice.sp500 = response.data.last[0];
                this.previousClosePercentage.sp500 = response.data.changepct[0];
            })
            .catch(error => {
                console.log(error);
            })
        },
        fetchDow(API_KEY) {
            axios.get("https://api.marketdata.app/v1/indices/quotes/DJI/", {
                headers: {
                    "Authorization" : "Bearer " + API_KEY
                }
            })
            .then(response => {
                this.currentPrice.dow30 = response.data.last[0];
                this.previousClosePercentage.dow30 = response.data.changepct[0];
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            })
        },
        fetchNasdaq(API_KEY) {
            axios.get("https://api.marketdata.app/v1/indices/quotes/IXIC/", {
                headers: {
                    "Authorization" : "Bearer " + API_KEY
                }
            })
            .then(response => {
                this.currentPrice.nasdaq = response.data.last[0];
                this.previousClosePercentage.nasdaq = response.data.changepct[0];
            })
            .catch(error => {
                console.log(error);
            })
        },
        fetchRussell(API_KEY) {
            axios.get("https://api.marketdata.app/v1/indices/quotes/RUT/", {
                headers: {
                    "Authorization" : "Bearer " + API_KEY
                }
            })
            .then(response => {
                this.currentPrice.russell2000 = response.data.last[0];
                this.previousClosePercentage.russell2000 = response.data.changepct[0];
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            })
        }
    },
    created() {
        this.fetchCurrentPrices();
        console.log("Index display has been created");
        console.log(this.currentPrice.sp500);
        console.log(this.previousClosePercentage.sp500);
    }
}
</script>