<template>
   <div class="stock-info-container">
        <div class="name-and-ticker" style="grid-area: name-and-ticker"> 
            <div class="img-name-ticker">
                <img :src="imgPath" class="stock-logo"/>
                <h1 class="stock-name">{{stockName}}</h1>
                <h1 class="ticker">{{ticker}}</h1>
            </div>
            <div class="icons">
                <button @click="isClicked = !isClicked">
                    <i class="material-icons-outlined" :style="{color : isClicked ? '#4C2AFF' : 'white'}">favorite_border</i>
                </button>
                <button @click="notificationsIsClicked = !notificationsIsClicked">
                    <i class="material-icons-outlined" :style="{color : notificationsIsClicked ? '#4C2AFF' : 'white'}">notifications_none</i>
                </button>
            </div>
        </div>
        <div class="pricing" style="grid-area: pricing">
            <h1 class="stock-price">${{last}}</h1>
            <div class="price-change">
                <h2 :class="{ positive: this.change > 0, negative: this.change < 0 }">{{ this.change }}  ({{ this.changepct }}%)</h2>
            </div>
        </div>
        <div class="ask-and-bid" style="grid-area: ask-and-bid">
            <div><h1 class="ask">Ask: <span class="ask-amount">{{ this.ask }}</span></h1></div>
            <div><h1 class="bid">Bid: <span class="bid-amount">{{ this.bid }}</span></h1></div>
        </div>
        <div class="week-high-low"  style="grid-area: week-high-low">
            <div class="high-container"><h1 class="five-two-week-high">52 Week High: <span class="high-amount">{{ this.weekHigh }}</span></h1></div>
            <div class="low-container"><h1 class="five-two-week-low">52 Week Low: <span class="low-amount">{{ this.weekHigh }}</span></h1></div>
        </div>
        <div class="volume"  style="grid-area: volume">
            <h1 class="volume-word">Volume: <span class="volume-amount">{{ this.volume }}</span></h1>
        </div>
   </div>
</template>

<script>
import * as MarketDataAPI from '@/api/market-data-api.js'

export default {
    name: 'StockInfo',
    props: ['ticker'],
    data() {
        return {
            ask: null,
            askSize: null,
            bid: null,
            bidSize: null,
            mid: null, //might not always be there
            last: null,
            change: null, //change and changepct wont always be there either, as it was with the indicies
            changepct: null,
            volume: null,
            weekHigh: null,
            weekLow: null,
            stockName: null,
            imgPath: null,
            stocks: [
                {name: "Apple", ticker: "AAPL"},
                {name: "Microsoft", ticker: "MSFT"},
                {name: "Google", ticker: "GOOGL"},
                {name: "Amazon", ticker: "AMZN", logo: require('@/assets/amazon-logo.svg')},
                {name: "Meta", ticker: "META"},
                {name: "Tesla", ticker: "TSLA", logo: require('@/assets/tesla-logo.svg')},
                {name: "Netflix", ticker: "NFLX"}
            ],
            isClicked: false,
            notificationsIsClicked: false
        }
        
    },
    methods: {
        fetchData() {
            MarketDataAPI.stockData(this.ticker)
            .then(data => {
                console.log(data)
                this.ask = data.ask[0];
                this.askSize = data.askSize;
                this.bid = data.bid[0];
                this.bidSize = data.bidSize;
                this.mid = data.mid;
                this.last = data.last[0];
                this.change = data.change[0];
                this.changepct = (parseFloat(data.changepct[0]) * 100).toFixed(2);
                this.volume = Number(data.volume[0]).toLocaleString();
                this.weekHigh = data['52weekHigh'][0];
                this.weekLow = data['52weekLow'][0];
            })
            .catch(error => {
                console.log(error);
            });
        },
        getStockName(ticker) {
            const stock = this.stocks.find(stock => stock.ticker === ticker);
            return stock ? stock.name : null;
        },
        getImgPath(ticker) {
            const stock = this.stocks.find(stock => stock.ticker === ticker);
            return stock ? stock.logo : null;
        }
    },
    mounted() {
        this.fetchData();
        this.stockName = this.getStockName(this.ticker);
        this.imgPath = this.getImgPath(this.ticker);
    }

}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@100;300;400;700&display=swap'); 
@import url('https://fonts.googleapis.com/icon?family=Material+Icons+Outlined');

.stock-info-container {  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
  gap: 0px 0px;
  grid-auto-flow: row;
  grid-template-areas:
    "name-and-ticker"
    "pricing"
    "ask-and-bid"
    "week-high-low"
    "volume";
    height: 100%;
    width: 100%;
    font-family: 'Montserrat', sans-serif;
}

.name-and-ticker { 
    grid-area: name-and-ticker; 
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.img-name-ticker {
    display: flex;
    align-items: baseline;
    color: white;
}

.stock-logo {
  width: 30px; /* Adjust as needed */
  height: 30px; /* Adjust as needed */
  object-fit: contain;
  margin-left: 30px;
  padding-right: 20px;
}

.stock-name {
    font-size: 30px;
    font-weight: 700;
    margin: 0;
    padding-right: 20px;
}

.ticker {
    font-size: 20px;
    font-weight: 300;
    margin: 0;
}

.material-icons-outlined {
    font-family: 'Material Icons Outlined';
    color:white;
    transition: color 0.3s ease;
}

button {
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
}

.icons {
    margin-right: 30px;
}

button:first-of-type .material-icons-outlined {
  margin-right: 20px;
}

.pricing { 
    grid-area: pricing; 
    display: flex;
    color: white;
    align-items: baseline;
}

.stock-price {
    font-size: 50px;
    font-weight: 700;
    margin-left: 30px;
}

.price-change {
    font-size: 15px;
    margin-left: 30px;
    display: flex;
    justify-content: space-around;
}
.positive {
    color: green;
}

.negative {
    color : red;
}

.ask-and-bid { 
    grid-area: ask-and-bid; 
    margin-left: 30px;
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    color:white;
    width: 70%;
}

.ask {
    font-size: 30px;
    font-weight: 700;
}

.ask-amount {
    font-size: 30px;
    font-weight: 300;
}

.bid {
    font-size: 30px;
    font-weight: 700;
}

.bid-amount {
    font-size: 30px;
    font-weight: 300;
}

.week-high-low {
    grid-area: week-high-low;
    margin-left: 30px;
    display: flex;
    justify-content: space-between;
    align-items:baseline;
    color: white;
 }

.five-two-week-high, .five-two-week-low {
    font-size: 30px;
    font-weight: 700;
}

.high-amount, .low-amount {
    font-size: 30px;
    font-weight: 300;
    display: flex;
    align-items: flex-start;
}

.volume { 
    grid-area: volume; 
    margin-left: 30px;
    display: flex;
    align-items: flex-start;
    color: white;
}

.volume-word {
    font-size: 30px;
    font-weight: 700;
}

.volume-amount {
    font-size: 30px;
    font-weight: 300;
}



</style>