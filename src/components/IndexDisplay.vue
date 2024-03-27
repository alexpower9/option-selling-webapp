<template>
  <div class="container">
    <div class="card" v-for="(value, index) in currentPrice" :key="index">
      <h5 class="card-title">{{ index.toUpperCase() }}</h5>
      <p class="card-text">{{ value }}</p>
      <p :class="{'card-change-positive': previousCloseValueChange[index] >= 0, 'card-change-negative': previousCloseValueChange[index] < 0}">
        {{ previousCloseValueChange[index] }} ({{ percentChange[index] }}%)
    </p>
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
    //make seperate calls for each index we are going to be using, realistically, none of this really belong here, 
    //but for the sake of the project, we will keep it here
    methods : {
        fetchCurrentPrices() {
            this.localAPICall("dow30").then(result => {
                        console.log(result + " is the db value for the dow30");
                    }).catch(error => {
                    console.log(error);
                    });


            MarketDataAPI.getDJIData()
            .then(data => {
                this.currentPrice.dow30 = data.last[0]

                if(data.change[0] === null) {
                    this.localAPICall("dow30").then(result => {
                        let dow30value = result;

                        this.previousCloseValueChange.dow30 = parseFloat((this.currentPrice.dow30 - dow30value).toFixed(2));
                        this.percentChange.dow30 = parseFloat((((this.currentPrice.dow30 - dow30value) / dow30value) * 100).toFixed(2));
                    }).catch(error => {
                        console.log(error);
                    });
                } else {
                    this.previousCloseValueChange.dow30 = data.change[0]
                    //add value to the db
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
                    this.localAPICall("vix").then(result => {
                        let vixValue = result;
    
                        this.previousCloseValueChange.vix = parseFloat((this.currentPrice.vix - vixValue).toFixed(2));
                        this.percentChange.vix = parseFloat((((this.currentPrice.vix - vixValue) / vixValue) * 100).toFixed(2));
                    }).catch(error => {
                        console.log(error);
                    });
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
                    this.localAPICall("sp500").then(result => {
                        let sp500Value = result;

                        this.previousCloseValueChange.sp500 = parseFloat((this.currentPrice.sp500 - sp500Value).toFixed(2));
                        this.percentChange.sp500 = parseFloat((((this.currentPrice.sp500 - sp500Value) / sp500Value) * 100).toFixed(2));
                    }).catch(error => {
                        console.log(error);
                    });
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
                    this.localAPICall("nasdaq").then(result => {
                        let nasdaqValue = result;

                        this.previousCloseValueChange.nasdaq = parseFloat((this.currentPrice.nasdaq - nasdaqValue).toFixed(2));
                        this.percentChange.nasdaq = parseFloat((((this.currentPrice.nasdaq - nasdaqValue) / nasdaqValue) * 100).toFixed(2));
                    }).catch(error => {
                        console.log(error);
                    });
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
        },
        addValueToDB(index, value) {
            LocalAPI.addLocalData(index, value)
            .then(data => {
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

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@100;300;400;700&display=swap'); 

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
  font-family: 'Montserrat', sans-serif;
  font-weight: 500;
  font-size: 0.8em;
  margin-bottom: 10px;
  color: #ffffff;
  position:absolute;
  top:-15px;
  left:10px;
}

.card-text {
  font-family: 'Montserrat', sans-serif; 
  font-weight: 500;
  font-size: 1em;
  color:#4C2AFF;
  position: absolute;
  left:10px;
  top:25px;

}

.card-change-positive {
    font-family: 'Montserrat', sans-serif; 
  font-weight: 500;
    font-size: 0.7em;
    color:#20ec38;
    position: absolute;
    left: 10px;
    top: 55px;
}

.card-change-negative {
    font-family: 'Montserrat', sans-serif; 
  font-weight: 500;
    font-size: 0.7em;
    color:#ff0000;
    position: absolute;
    left: 10px;
    top: 55px;
}
</style>