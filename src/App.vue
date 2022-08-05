<template>
  <div id="app">
   <header>
    <header-component></header-component>
   </header>
   <main>
     <router-view></router-view>
   </main>
  </div>
</template>

<script>
import HeaderComponent from './components/HeaderComponent.vue';

export default {
  name: 'App',
  components: {
    HeaderComponent,
  },
};
</script>

<style>
  main {
    padding: 30px 0px;
  }
</style>
