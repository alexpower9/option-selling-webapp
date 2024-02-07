<template>
    <h1>This is the page for {{ ticker }}</h1>
</template>

<script>
export default {
  name: 'StockPage',
  created() {
    console.log('StockPage created') //delete this later
  },
  props:['ticker']
}
</script>

<style scoped>
h1 {
    color: #000;
    font-size: 2em;
    text-align: center;
    margin-top: 20px;
}
</style>