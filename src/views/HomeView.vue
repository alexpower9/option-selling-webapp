<template>
<div class="top-bar">
    <TopBar></TopBar>
    <SearchBar></SearchBar>
</div>
</template>

<script>
import TopBar from '@/components/TopBar.vue'
import SearchBar from '@/components/SearchBar.vue'

export default {
  name: 'HomeView',
  components: {
    TopBar, SearchBar
  }
}

</script>

<style>


</style>
