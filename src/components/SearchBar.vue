<template>
    <div class="container">
      <div class="search-bar">
        <i class="material-icons-outlined">search</i>
        <input class="search-input" type="text" v-model="search" placeholder="Search">
      </div>
      <div class="results">
        <div v-for="(stock, index) in filteredStocks" 
        :key="stock.ticker"
        :class="{ 'highlighted': index === 0, 'stock-name': true }" 
        @click="goToPage(stock.ticker)">
        {{ stock.name }} ({{ stock.ticker }})
      </div>
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
    goToPage(ticker) {
      this.$router.push({name: 'stock', params: {ticker: ticker}});
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
@import url('https://fonts.googleapis.com/icon?family=Material+Icons+Outlined');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Montserrat', sans-serif; 
}
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.material-icons-outlined {
  font-family: 'Material Icons Outlined';
  color: #4C2AFF;
}
.stock-name {
  box-shadow: 0 0 0 3px #4C2AFF;
  color: white;
  width: 90%;
  border-radius: 10px;
  padding: 3px;
  display: inline-block; /* To apply padding and border to inline elements */
  margin-bottom: 20px; /* Space between items, adjust as needed */
}

.stock-name:hover {
  color: #4C2AFF;
  cursor: pointer;
}

.highlighted {
  color: #4C2AFF;
}
 
.results {
  width: 258px;
  position: absolute;
  top: 100px;
}
.search-bar 
{
  display: flex;
  align-items: center;
  max-width: 260px;
  border-radius: 28px;
  background: #24252A;
  padding: 14px;
  box-shadow: 0 0 0 3px #4C2AFF;
  transition: box-shadow 0.25s ease 0s;
  /* margin-bottom: 20px; */
  position: relative;
}
.search-bar:focus-within{
  box-shadow: 0 0 0 3px #4425dd;
}
.search-input{
  font-size:16px;
  color: whitesmoke;
  margin-left: 14px;
  outline: none;
  border: none;
  background: transparent;
}

.search-input::placeholder {
  color: whitesmoke;
  opacity: 0.7;
}

</style>