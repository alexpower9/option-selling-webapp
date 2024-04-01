<template>
    <div class="container">
        <h1>{{ ticker }}</h1>
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
            weekLow: null
        }
        
    },
    methods: {
        fetchData() {
            MarketDataAPI.stockData(this.ticker)
            .then(data => {
                console.log(data)
                this.ask = data.ask;
                this.askSize = data.askSize;
                this.bid = data.bid;
                this.bidSize = data.bidSize;
                this.mid = data.mid;
                this.last = data.last;
                this.change = data.change;
                this.changepct = data.changepct;
                this.volume = data.volume;
                this.weekHigh = data['52weekHigh'];
                this.weekLow = data['52weekLow'];
            })
            .catch(error => {
                console.log(error);
            });
        }
    },
    mounted() {
        this.fetchData();
    }

}
</script>

<style scoped>
.container {
    width: 22%;
    height: 100vh;
}
</style>