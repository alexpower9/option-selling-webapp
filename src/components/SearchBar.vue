<template>
    <div>
        <input type="text" v-model="search" placeholder="Search stocks...">
        <div v-for="stock in filteredStocks" :key="stock.ticker" @click="goToPage(stock.ticker)">
            {{ stock.name }} ({{ stock.ticker }})
        </div>
    </div>
</template>

<script>
export default {
  name: 'SearchBar',
  created() {
    console.log('SearchBar created') //delete this later
  },
  data() {
    return {
        search: '',
        stocks: [
        {name: "Apple", ticker: "AAPL"},
        {name: "Microsoft", ticker: "MSFT"},
        {name: "Google", ticker: "GOOGL"},
        {name: "Amazon", ticker: "AMZN"},
        {name: "Facebook", ticker: "FB"},
        {name: "Tesla", ticker: "TSLA"},
        {name: "Netflix", ticker: "NFLX"}
      ]
    }
  },
  methods: {
    //we will use this method to navigate to the stock page eventually
    goToPage() {
      //this.$router.push({name: 'Stock', params: {ticker: ticker}})
    }
  },
  computed: {
    //this should filter based off of either ticker or name
    filteredStocks() {
      if(this.search == '') return [];
      else
      {
        const searchLower = this.search.toLowerCase();
        return this.stocks.filter(stock => 
        stock.name.toLowerCase().includes(searchLower) || 
        stock.ticker.toLowerCase().includes(searchLower)
        );
      }
    },
    }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@500&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Montserrat', sans-serif; 
}

input {
  width: 200px;
  height: 30px;
  padding: 5px;
  border-radius: 5px;
  border: 1px solid #ccc;
}
</style>