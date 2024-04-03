<template>
  <div class="container">
    <div class="search-bar" style="grid-area: Search-Bar;">
      <TopBar></TopBar>
    </div>
    <div class="stock-info" style="grid-area: Stock-Info;"><StockInfo :ticker="ticker"></StockInfo></div>
    <div class="stock-graph" style="grid-area: stock-graph"></div>
  </div>
  <!-- <TopBar></TopBar>
  <IndexDisplay></IndexDisplay>
  <div class="flex-container">
    <div class="flex-button">
      <button @click="showOverview()">Overview</button>
      <button @click="showCallChain()">Options Chain</button>
    </div>
  </div>
  <div class="chain-container" v-if="!summaryDisplay">
    <CallChain v-if="optionData" :optionsData="optionData"></CallChain>
    <PutChain v-if="optionData" :optionsData="optionData"></PutChain>
  </div> 
  <StockInfo :ticker="ticker" v-if="summaryDisplay"></StockInfo> -->
</template>

<script>
import TopBar from '@/components/TopBar.vue'
import axios from 'axios';
import CallChain from '@/components/CallChain.vue';
import PutChain from '@/components/PutChain.vue';
import IndexDisplay from '@/components/IndexDisplay.vue';
import * as MarketDataAPI from '@/api/market-data-api.js'
import StockInfo from '@/components/StockInfo.vue';

export default {
  name: 'StockPage',
  components: {TopBar, CallChain, PutChain, IndexDisplay, StockInfo},
  props:['ticker'],
  data() {
    return {
      price: null,
      strikes: [],
      optionData: null,
      summaryDisplay: true
    };
  },
  methods: {
    fetchData() {
      this.strikes = [];
      let API_KEY = process.env.VUE_APP_API_KEY; 

      axios.get('https://api.marketdata.app/v1/options/chain/' + this.ticker +'/', {
        headers: {
          'Authorization': 'Bearer ' + API_KEY
        },
        params: {
          //dont actually need the date if I omit it all together
          //dte : 365
          strikeLimit: 20, //only 10 strikes for now
        }
      })
      .then(response => {
        this.optionData = response.data;
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
    },
    fetchDataWithAPI() {
      MarketDataAPI.getOptionData(this.ticker, 20)
      .then(data => {
        this.optionData = data;
      })
      .catch(error => {
        console.log(error);
      });
    },
    showOverview() {
      this.summaryDisplay = true;
      console.log("Showing overview")
    },
    showCallChain() {
      this.summaryDisplay = false;
      console.log("Showing overview")
    }
  },
  mounted() {
    console.log('StockPage created') //delete this later
    this.fetchDataWithAPI();
  },
  watch: {
    ticker: {
    immediate: true,
    handler() {
      this.fetchDataWithAPI();
      }
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@100;300;400;700&display=swap'); 

.container {
  display: grid; 
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr; 
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr; 
  gap: 0px 0px; 
  grid-template-areas: 
    "Search-Bar Search-Bar Search-Bar Search-Bar Search-Bar Search-Bar Search-Bar"
    "Stock-Info Stock-Info stock-graph stock-graph stock-graph stock-graph stock-graph"
    "Stock-Info Stock-Info stock-graph stock-graph stock-graph stock-graph stock-graph"
    "Stock-Info Stock-Info stock-graph stock-graph stock-graph stock-graph stock-graph"
    "Stock-Info Stock-Info stock-graph stock-graph stock-graph stock-graph stock-graph"; 
  height: 100vh;
}

.search-bar { 
  grid-area: Search-Bar; 
}

.stock-info {
  grid-area: Stock-Info;
}

.stock-graph {
  grid-area: stock-graph;
}
/* h1 {
    color: #ffffff;
    font-size: 2em;
    text-align: center;
    margin-top: 20px;
}

.chain-container {
    display: flex;
    justify-content: space-around;
    margin-top: 60px;
}

.flex-container {
  display: flex;
  justify-content: space-between;
}

.flex-button {
  display: flex;
  justify-content: flex-start;
  margin-top: 20px;
  width: 33%;
  gap: 4em;
  margin-left: 6%;
}

.flex-button button {
  border-radius: 28px;
  background: #24252A;
  padding: 15px 60px; 
  border: none; 
  outline: 0;
  box-shadow: 0 0 0 3px #4C2AFF; 
  font-family: 'Montserrat', sans-serif;
  font-weight: 500;
  color: rgba(245, 245, 245, 0.7);
  transition: color 0.3s ease;
}

.flex-button button:hover {
  color: rgb(255, 255, 255);
  cursor: pointer;
} */
</style>