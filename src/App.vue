<template>
  <div id="app">
    <header-tbd />
    <router-view/>  
  </div>
</template>


<script>

import Header from '@/components/Home/Header.vue'

export default {
  components: {
    'header-tbd':Header
  }
  
}
</script>
