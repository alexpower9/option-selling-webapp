<template>
  <body>
    <header class="nav-bar">
      <img class="logo" src="../assets/FinanceLogo.svg" alt="logo" @click="returnHome">
      <div class="search-bar-container">
        <SearchBar></SearchBar>
      </div>
      <nav>
        <ul class="nav-links">
          <li><router-link to="/sign-up">Sign Up</router-link></li>
          <li><router-link to="/contact">Contact</router-link></li>
        </ul>
      </nav>
    </header>
  </body>
</template>
  
<script>
import SearchBar from '@/components/SearchBar.vue'

export default {
  name: 'TopBar',
  components: {
    SearchBar
  },
  created() {
    console.log('TopBar created') //delete this later
  },
  methods: {
    returnHome() {
      this.$router.push('/');
    }
  }
}
</script>
  
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@500&display=swap');
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  background-color: #24252A;
  font-family: 'Montserrat', sans-serif; 
}

.logo-link {
  text-decoration: none;
}

li, a{
  font-weight: 500;
  font-size: 16px;
  color:azure;
  text-decoration: none;
}

a:hover {
  color: #4C2AFF;
}

header {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 30px 10%;
}
.logo {
  width: 40px;
  height: 40px;
  cursor:pointer;
  margin-right: auto;
}

.nav-links {
  list-style: none;
  margin-left: 20px;
}

.nav-links li {
  display: inline-block;
  padding: 0 20px;
  transition: all 0.3s ease 0s;
}

.search-bar-container {
  display: flex; 
  justify-content: center;
}
</style>