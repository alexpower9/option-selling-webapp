<template>
  <div class="top-bar">
      <TopBar></TopBar>
  </div>
  <div class="container">
  <div class="text">
    <h1 class="hello">Practice Options Trading With Real Time Data On Blue Chip Stocks</h1>
    <div class="desc-words">
      <div>Practice</div>
      <div>Research, Trade</div>
      <div>and Much More!</div>
    </div>
  </div>
  <img class="icon" alt="trading" src="../assets/option-icon.png">
</div>
</template>

<script>
import TopBar from '@/components/TopBar.vue'
import axios from 'axios'

export default {
  name: 'HomeView',
  components: {
    TopBar
  },
  methods: {
    //just test local api with this
    async testLocalAPI() {
      console.log('testing local api')
      try {
        const response = await axios.get('http://localhost:3000/api/dow30')
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    }
  },
  mounted: function() {
    this.testLocalAPI()
  }
}

</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@100&display=swap');
.container {
  display: flex;
  justify-content: space-between;
}
.hello{
  font-family: 'Montserrat', sans-serif;
  font-size: 15px;
  color: #4C2AFF;
  text-align: center;
  margin-top: 100px;
}

.text {
  margin-top: 10px;
  margin-bottom: 100px;
  width: 50%; 
  float: left; 
  margin-left: -100px;
}

.desc-words {
  font-family: 'Montserrat', sans-serif;
  font-size: 90px;
  color: #ffffff;
  text-align: left;
  margin-top: 25px;
  margin-left: 220px;
}

</style>
