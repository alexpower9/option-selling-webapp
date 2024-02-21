<template>
  <div class="container">
    <div class="table-wrapper">
    <table class="table-style">
      <thead>
        <tr>
          <th>Ask</th>
          <th>Bid</th>
          <th>DTE</th>
          <th>Open Interest</th>
          <th>Strike</th>
          <th>Volume</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(option, index) in optionsData.strike.slice(0, 20)" :key="index">
          <td>{{ optionsData.ask[index] }}</td>
          <td>{{ optionsData.bid[index] }}</td>
          <td>{{ optionsData.dte[index] }}</td>
          <td>{{ optionsData.openInterest[index] }}</td>
          <td>{{ option }}</td>
          <td>{{ optionsData.volume[index] }}</td>
        </tr>
      </tbody>
    </table>
  </div>
  </div>
</template>

<script>
export default {
    name: 'CallChain',
    props: {
      optionsData : Object
    },
    created: function() {
      console.log('Call chain created') //delete this later
      //console.log(JSON.parse(JSON.stringify(this.optionsData)));
    }
}
</script>

<style scoped> 
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@100&display=swap");

.table-wrapper {
  border: 2px solid #4C2AFF;
  border-radius: 15px;
  overflow: hidden; 
  display: inline-block; /* Add this line */
  margin: auto; /* Add this line */
}

.table-style {
  border-collapse: separate; /* Change from collapse to separate */
  border-spacing: 0 1em;
  border-collapse: collapse;
  width: 100%; 
  color: white;
  margin-left: auto;
  margin-right: auto;
  font-family: 'Montserrat', sans-serif;
}
.table-style td, .table-style th {
  padding: 0 20px; /* Adjust the values as needed */
}

.table-style th {
  padding-bottom: 10px;
}
.type-text {
  color: white;
  font-family: 'Montserrat', sans-serif;
  font-size: 18px;
}
.table-style tr:not(:last-child) {
  border-bottom: 1px solid rgba(76, 42, 255, 0.6); 
  color: rgba(255, 255, 255, 0.6); 
}

.table-style tr:last-child {
  color: rgba(255, 255, 255, 0.6); 
}

.table-style th {
  color: rgba(255, 255, 255, 1); 
}


</style>
