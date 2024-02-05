<template>
  <body>
    <header class="nav-bar">
      <img class="logo" src="../assets/FinanceLogo.svg" alt="logo">
      <nav>
        <ul class="nav-links">
          <li><router-link to="/about">Holder Text</router-link></li>
        </ul>
      </nav>
      <router-link to="/contact" class="contact-link">
        <button>Contact</button>
      </router-link>
    </header>
  </body>
</template>
  
<script>
export default {
  name: 'TopBar',
  created() {
    console.log('TopBar created')
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

li, a, button {
  font-weight: 500;
  font-size: 16px;
  color:azure;
  text-decoration: none;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px 10%;
}

.logo {
  width: 40px;
  height: 40px;
  cursor:pointer;
}

.nav-links {
  list-style: none;
}

.nav-links li {
  display: inline;
  padding: 0 20px;
  transition: all 0.3s ease 0s;
}

.nav-links li:hover {
  color: #432cc5;
}

button {
  padding: 9px 25px;
  background-image: linear-gradient(to right, #4C2AFF, #5c51b4), linear-gradient(to right, #6d5ce5, #4C2AFF);
  background-size: 100% 200%;
  background-position: 100% 0;
  color: #fff;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease 0s;
}

button:hover {
  background-position: 0 100%;
}
</style>