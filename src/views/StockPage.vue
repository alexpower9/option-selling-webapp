<template>
  <TopBar></TopBar>
  <h1>This is the page for {{ ticker }}</h1>
  <h1>This is the current price {{ price }}</h1>
</template>

<script>
import TopBar from '@/components/TopBar.vue'
import axios from 'axios';

export default {
  name: 'StockPage',
  components: {TopBar},
  props:['ticker'],
  data() {
    return {
      price: null,
      strikes: [],
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
        console.log("This is our response data",response.data);
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
</style>