<template>
  <TopBar></TopBar>
  <IndexDisplay></IndexDisplay>
  <h1>This is the page for {{ ticker }}</h1>
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
        //console.log(this.optionsData);
      })
      .catch(error => {
        console.log(error);
      });
    }
  },
  created() {
    console.log('StockPage created') //delete this later
    this.fetchData();
  },
  watch: {
    ticker: {
    immediate: true,
    handler() {
      this.fetchData();
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