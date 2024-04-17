<template>
  <div class="container">
    <div class="search-bar" style="grid-area: Search-Bar;">
      <TopBar></TopBar>
    </div>
    <div class="stock-info" style="grid-area: Stock-Info;"><StockInfo :ticker="ticker"></StockInfo></div>
    <div class="stock-graph" style="grid-area: stock-graph">
        <StockGraph v-if="series[0].data && series[0].data.length > 0" :options="options" :series="series"></StockGraph>
    </div>
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
import moment from 'moment-timezone';
import TopBar from '@/components/TopBar.vue'
import axios from 'axios';
import CallChain from '@/components/CallChain.vue';
import PutChain from '@/components/PutChain.vue';
import IndexDisplay from '@/components/IndexDisplay.vue';
import * as MarketDataAPI from '@/api/market-data-api.js'
import StockInfo from '@/components/StockInfo.vue';
import StockGraph from '@/components/StockGraph.vue'

export default {
  name: 'StockPage',
  components: {TopBar, CallChain, PutChain, IndexDisplay, StockInfo, StockGraph},
  props:['ticker'],
  data() {
    return {
      price: null,
      strikes: [],
      optionData: null,
      summaryDisplay: true,
      options : {
        chart: {
          id: 'vuechart-example',
          toolbar: {
            show : false
          }
        },
        xaxis: {
          categories: []
        },
        dataLabels: {
          enabled : false
        },
        stroke: {
          show : false
        },
        fill: {
          type : "gradient",
          gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.7,
            opacityTo: 0.9,
            stops: [0,90,100]
          }
        },
        colors : ["#4C2AFF", "#705dd0","#9784f5"],
      },
      series :  [{
        name: 'Price',
        data: []
      }]
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
    },
    fetchStockChartData() {
      //this.options.xaxis.categories = [];
      const now = moment().tz("America/New_York");
      const marketOpen = moment().tz("America/New_York").hour(9).minute(30).second(0);
      const marketClose = moment().tz("America/New_York").hour(16).minute(0).second(0);
      let from, to;

      if (now.isBetween(marketOpen, marketClose)) {
        from = marketOpen.unix();
        to = now.unix();
      } else {
        let previousDay = now.subtract(1, 'days');
        while (previousDay.day() === 0 || previousDay.day() === 6) {
          previousDay.subtract(1, 'days');
        }
        from = previousDay.hour(9).minute(30).second(0).unix();
        to = previousDay.hour(16).minute(0).second(0).unix();
      }
      let intervals = Math.ceil((to - from) / (15 * 60));
      let categories = [];
      for (let i = 0; i < intervals; i++) {
        let time = moment.unix(from).add(i * 15, 'minutes');
        categories.push(time.format('h:mm A'));    
      }

      this.options.xaxis.categories = categories;
      //console.log(this.series[0].data);

      console.log('From:', moment.unix(from).format('HH:mm')); // print 'from' in 'HH:mm' format
      console.log('To:', moment.unix(to).format('HH:mm')); // print 'to' in 'HH:mm' format


      MarketDataAPI.stockGraphData(this.ticker, from, to)
      .then(data => {
        console.log("Here is the data ", data)
        this.series[0].data = [...data.c];
      })
      .catch(error => {
        console.log(error)
      })
    }
  },
  mounted() {
    console.log('StockPage created') //delete this later
    this.fetchDataWithAPI();
    this.fetchStockChartData()
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