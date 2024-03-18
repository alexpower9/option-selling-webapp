<template>
  <div class="container">
    <div class="card" v-for="(value, index) in currentPrice" :key="index">
      <h5 class="card-title">{{ index.toUpperCase() }}</h5>
      <p class="card-text">{{ value }}</p>
      <p class="card-change"> {{ previousCloseValueChange[index] }} ({{ percentChange[index] }}%)</p>
    </div>
  </div>
</template>


<script>

import * as MarketDataAPI from '@/api/market-data-api.js'
//import { getLocalData } from '@/api/local-api'

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
            previousCloseValueChange : {
                sp500: null,
                nasdaq: null,
                dow30: null,
                vix: null
            },
            percentChange: {
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
                this.currentPrice.dow30 = data.last[0]

                if(data.change[0] === null) {
                    // getLocalData('dow30')
                    // .then(data => {
                    //     getLocalData('dow30')
                    // })
                    // .catch(error => {
                    //     console.log(error)
                    // })
                } else {
                    this.previousCloseValueChange.dow30 = data.change[0]
                    console.log("The change from the price of yesterday is " + this.previousCloseValueChange.dow30)
                }
            })
            .catch(error => {
                console.log(error)
            })

            //vix
            MarketDataAPI.getVIXData()
            .then(data => {
                this.currentPrice.vix = data.last[0]

                if(data.change[0] === null) {
                    //make call to backend to get the previous close, calculate change from that
                    //blah blah blah 
                } else {
                    this.previousCloseValueChange.vix = data.change[0]
                }
            })
            .catch(error => {
                console.log(error)
            })

            //spy
            MarketDataAPI.getSPYData()
            .then(data => {
                this.currentPrice.sp500 = data.last[0]
                if(data.change[0] === null) {
                    let last = 5000; //just a place holder
                    this.previousCloseValueChange.sp500 = this.currentPrice.sp500 - last;
                    this.percentChange.sp500 = ((this.currentPrice.sp500 - last) / last)*100;
                    console.log(this.percentChange.sp500);
                } else {
                    this.previousCloseValueChange.sp500 = data.change[0]
                }
            })
            .catch(error => {
                console.log(error)
            })

            //nasdaq            
            MarketDataAPI.getNasdaqData()
            .then(data => {
                this.currentPrice.nasdaq = data.last[0]
                if(data.change[0] === null) {
                    //make call to backend to get the previous close, calculate change from that
                    //blah blah blah 
                } else {
                    this.previousCloseValueChange.nasdaq = data.change[0]
                }
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

<style scoped>
.container {
  display: flex;
  justify-content: space-between;
  width: 70vw;
  margin:auto;
}

.card {
    position:relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    flex: 1;
    margin: 10px;
    padding: 20px;
    height: 48px;
    border: 1px solid rgba(241, 241, 241, 0.2); 
    border-radius: 10px;
}


.card-title {
  font-size: 0.8em;
  margin-bottom: 10px;
  color: #ffffff;
  position:absolute;
  top:-15px;
  left:10px;
}

.card-text {
  font-size: 1em;
  color:#4C2AFF;
  position: absolute;
  left:10px;
  top:25px;
  font-weight: bold;
}

.card-change {
    font-size: 0.7em;
    color:#20ec38;
    position: absolute;
    left: 10px;
    top: 55px;
}
</style>