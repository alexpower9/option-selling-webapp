<template>
  <div class="top-bar">
      <TopBar></TopBar>
  </div>
  <div class="flex-container">
    <div class="flex-item text">
      <h1 id="simple-text">All Your Option Needs In A Sleek UI</h1>
    </div>
    <div class="flex-item image">
      <img src="../assets/homepage-icon.svg" alt="homepage-icon" id="cpu">
    </div>
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
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@100;300;400;700&display=swap'); 

.flex-container {
  display: flex;
  height:100vh;
}

.flex-item {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center; 
  text-align: center; 
}

@media (max-width: 800px) {  
  .flex-container {
    flex-direction: column;
  }
}

.text {
  font-size: 3.0vw;
  color: white;
  transform: translateY(-20%);
  margin-left: 2%;
}

#cpu {
  width: 30vw;
  height:auto;
  transform: translateY(-15%);
  
}

#simple-text {
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
}
</style>
