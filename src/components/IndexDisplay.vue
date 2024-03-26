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
import * as LocalAPI from '@/api/local-api.js'

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
            //Here is how the db numbers are
            this.localAPICall("sp500").then(result => {
            console.log("DB numbers as proof\nSP500:" + result);
            }).catch(error => {
            console.log(error);
            });


            MarketDataAPI.getDJIData()
            .then(data => {
                this.currentPrice.dow30 = data.last[0]

                if(data.change[0] === null) {
                    this.previousCloseValueChange.dow30 = this.currentPrice.dow30 - this.localAPICall("dow30");
                    this.percentChange.dow30 = ((this.currentPrice.dow30 - this.localAPICall("dow30")) / this.localAPICall("dow30"))*100;
                } else {
                    this.previousCloseValueChange.dow30 = data.change[0]
                    //add value 
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
                    this.previousCloseValueChange.vix = this.currentPrice.vix - this.localAPICall("vix");
                    this.percentChange.vix = ((this.currentPrice.vix - this.localAPICall("vix")) / this.localAPICall("vix"))*100;
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
                    this.previousCloseValueChange.sp500 = this.currentPrice.sp500 - this.localAPICall("sp500");
                    this.percentChange.sp500 = ((this.currentPrice.sp500 - this.localAPICall("sp500")) / this.localAPICall("sp500"))*100;
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
                    this.previousCloseValueChange.nasdaq = this.currentPrice.nasdaq - this.localAPICall("nasdaq");
                    this.percentChange.nasdaq = ((this.currentPrice.nasdaq - this.localAPICall("nasdaq")) / this.localAPICall("nasdaq"))*100;
                } else {
                    this.previousCloseValueChange.nasdaq = data.change[0]
                }
            })
            .catch(error => {
                console.log(error)
            })
        },
        localAPICall(index) {
            return LocalAPI.getLocalData(index)
            .then(data => {
                //console.log(data[index])
                return data[index]
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