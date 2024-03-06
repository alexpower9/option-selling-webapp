<template>
<!--This component will have the following 4 indices: S&P 500, NASDAQ, DOW30 and RUSSELL2000-->
<!--Not sure if the api calls should be done from here or the stock page component tbh-->
<h1>The current price of the DJI is {{ this.currentPrice.dow30 }}</h1>
<h1>The current price of the vix is  {{ this.currentPrice.vix }}</h1>
</template>

<script>

import * as MarketDataAPI from '@/api/market-data-api.js'

export default {
    name: 'IndexDisplay',
    data() {
        return {
            currentPrice : {
                sp500: null,
                nasdaq: null,
                dow30: null,
                vix: null
            },
            previousClosePercentage : {
                sp500: null,
                nasdaq: null,
                dow30: null,
                vix: null
            }
        }
    },
    //make seperate calls for each index we are going to be using
    methods : {
        fetchCurrentPrices() {
            //just dow for now and vix
            MarketDataAPI.getDJIData()
            .then(data => {
                console.log(data)
                this.currentPrice.dow30 = data.last[0]
            })
            .catch(error => {
                console.log(error)
            })

            //vix
            MarketDataAPI.getVIXData()
            .then(data => {
                this.currentPrice.vix = data.last[0]
                console.log(data)
            })
            .catch(error => {
                console.log(error)
            })
        }
    },
    mounted() {
        this.fetchCurrentPrices();
    }
}
</script>