<template>
  <TopBar></TopBar>
  <IndexDisplay></IndexDisplay>
  <div class="chain-container">
    <CallChain v-if="optionData" :optionsData="optionData"></CallChain>
    <PutChain v-if="optionData" :optionsData="optionData"></PutChain>
  </div>
</template>

<script>
import TopBar from '@/components/TopBar.vue'
import axios from 'axios';
import CallChain from '@/components/CallChain.vue';
import PutChain from '@/components/PutChain.vue';
import IndexDisplay from '@/components/IndexDisplay.vue';
import * as MarketDataAPI from '@/api/market-data-api.js'
import * as TwelveDataAPI from '@/api/twelve-data-api.js'

export default {
  name: 'StockPage',
  components: {TopBar, CallChain, PutChain, IndexDisplay},
  props:['ticker'],
  data() {
    return {
      price: null,
      strikes: [],
      optionData: null
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

      //test twelve data
      TwelveDataAPI.getNSDQData()
      .then(data => {
        console.log(data)
      })
      .catch(data => {
        console.log(data)
      })
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
h1 {
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
</style>