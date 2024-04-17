<template>
    <div class="chart-container">
        <apexchart width="800" type="area" :options="options" :series="series"></apexchart>
    </div>
</template>

<script>
export default {
    name: 'StockGraph',
    props: {
        options: {
            type: Object,
            required: true
        },
        series: {
            type: Array,
            required: true
        }
  }
}
</script>

<style scoped>
.chart-container {
    display: flex;
    justify-content: center;
    
}
</style>