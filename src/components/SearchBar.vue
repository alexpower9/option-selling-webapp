<template>
    <div class="container">
      <div class="search-bar">
        <i class="material-icons-outlined">search</i>
        <input ref="searchInput" class="search-input" type="text" v-model="search" placeholder="Search" @keyup.enter="goToPage(filteredStocks[highlightedIndex].ticker)"
        @keydown.up.prevent="highlightedIndex = (highlightedIndex + filteredStocks.length - 1) % filteredStocks.length"
        @keydown.down.prevent="highlightedIndex = (highlightedIndex + 1) % filteredStocks.length">
      </div>
      <div class="results results-background" v-show="filteredStocks.length > 0"> <!--This should only appear if we are actually searching-->
        <div v-for="(stock, index) in filteredStocks" 
        :key="stock.ticker"
        :class="{ 'highlighted': index === highlightedIndex, 'stock-name': true }" 
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
        highlightedIndex: 0,
        stocks: [
        {name: "Apple", ticker: "AAPL"},
        {name: "Microsoft", ticker: "MSFT"},
        {name: "Google", ticker: "GOOGL"},
        {name: "Amazon", ticker: "AMZN"},
        {name: "Meta", ticker: "META"},
        {name: "Tesla", ticker: "TSLA"},
        {name: "Netflix", ticker: "NFLX"}
      ]
    }
  },
  methods: {
    //we will use this method to navigate to the stock page eventually
    goToPage(ticker) {
      this.$refs.searchInput.blur(); //unfocus the search bar apparently after we use it
      this.$router.push({name: 'stock', params: {ticker: ticker}});
      this.highlightedIndex = 0; //reset to the first element when we go back to the search bar
      this.search = ''; //clear the search bar
    },
    goToFirstResult() {
      if(this.filteredStocks.length > 0) {
        this.goToPage(this.filteredStocks[0].ticker);
      }
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
  display: inline-block; 
  margin-bottom: 20px; 
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

.results-background {
  background-color: #24252A; /* gray */
  padding: 15px 10px 0px 10px;
  border-radius: 5px;
  max-height: 200px;
  overflow-y: auto;
  z-index: 1000;
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