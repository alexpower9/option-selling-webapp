<template>
    <div class="container">
        <div class="stock-info">
            <h2 class="stock-name">{{ stockName }}</h2>
            <h1 class="stock-ticker">{{ ticker }}</h1>
        </div>
        <div class="pricing">
            <h3 class="current-price">{{ last }}</h3>
            <h3 :class="{'positive-change': change > 0, 'negative-change': change <= 0}"> {{ change }} ({{ changepct }}%) </h3>
        </div>
        <div class="ask-and-bid">
            <h3 class="ask">Ask: <span class="dynamic-content">{{ ask }}</span></h3>
            <h3 class="bid">Bid: <span class="dynamic-content">{{ bid }}</span></h3>
        </div>
        <div class="volume">
            <h3 class="current-volume">Volume: <span class="dynamic-content">{{ volume }}</span></h3>
        </div>
        <div class="week-high-low">
            <h3 class="week-high">52 Week High: <span class="dynamic-content">{{ weekHigh }}</span></h3>
            <h3 class="week-low">52 Week Low: <span class="dynamic-content">{{ weekLow }}</span></h3>
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
                this.changepct = data.changepct[0];
                this.volume = data.volume[0];
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
        }
    },
    mounted() {
        this.fetchData();
        this.stockName = this.getStockName(this.ticker);
    }

}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@100;300;400;700&display=swap'); 

.container {
    width: 24%;
    height: 100vh;
    font-family: 'Montserrat', sans-serif;
}

.stock-name {
    padding: 10px;
    color: white;
    font-family: 'Montserrat', sans-serif;
    font-weight: 500;
}

.stock-ticker {
    padding: 10px;
    color: white;
    font-weight: 300;
    font-size: 0.8em;
}

.stock-info {
  display: flex;
  align-items: baseline; /* aligns the text baselines of the h1 and h2 */
  margin-left:20px
}

.pricing {
    display: flex;
    align-items: baseline;
    margin-left: 20px;
}

.current-price {
    font-size: 3em;
    font-weight: 700;
    color: #ffffff;
    margin-top:-20px;
}

.positive-change {
    font-size: 0.9em;
    font-weight: 500;
    color: #20ec38;
    margin-top: -10px;
    padding-left: 10px;
}

.negative-change {
    font-size: 0.9em;
    font-weight: 500;
    color: #ff0000;
    margin-top: -10px;
    padding-left: 10px;
}

.dynamic-content {
    font-size: 1em;
    font-weight: 500;
    color: rgb(255, 255, 255);
}

.ask-and-bid {
  display: flex;
  align-items: baseline; /* aligns the text baselines of the h1 and h2 */
  margin-left:25px;
  color: white;
  margin-top: -50px;
}

.ask {
    font-size: 1em;
    font-weight: 300;
}

.bid {
    font-size: 1em;
    font-weight: 300;
    padding-left: 20px;
}

.volume {
    display: flex;
    align-items: baseline;
    margin-left: 25px;
    margin-top: -10px;
}

.current-volume {
    font-size: 1em;
    font-weight: 300;
    color:white;
}

.week-high-low {
    display: flex;
    align-items: baseline; /* aligns the text baselines of the h1 and h2 */
    margin-left:25px;
    color: white;
    margin-top: -10px;
}

.week-high, .week-low {
    font-size: 1em;
    font-weight: 300;
}

.week-low {
    padding-left: 18px;
}
</style>