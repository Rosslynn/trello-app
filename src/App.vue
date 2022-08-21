<template>
  <div id="app">
   <header>
    <header-component></header-component>
   </header>
   <main>
     <router-view></router-view>
   </main>
   <footer>
    <notifications-container></notifications-container>
   </footer>
  </div>
</template>

<script>
import 'nprogress/nprogress.css';
import HeaderComponent from './components/HeaderComponent.vue';

export default {
  name: 'App',
  created() {
    this.$root.$i18n.locale = localStorage.getItem('lang') || 'en';
  },
  components: {
    HeaderComponent,
    NotificationsContainer: () => import('./components/NotificationsContainer.vue'),
  },
};
</script>

<style>
  main {
    padding: 30px 0px;
  }
</style>
