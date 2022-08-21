<!-- eslint-disable max-len -->
<template>
  <div>
    <div class="bg-primary text-white langs">
      <div class="container d-flex justify-content-end">
        <base-button
          class="btn btn-sm btn-link text-white d-flex align-items-center"
          style="text-decoration: none !important;"
          v-for="lang of getLangs" :key="JSON.stringify(lang)"
          @click="changeLanguage(lang.value)">
            <img :src="lang.image" class="mr-2" alt="country flag" /> {{ lang.valueToDisplay }}
        </base-button>
      </div>
    </div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container">
        <router-link data-test-id="logo" class="navbar-brand" :to="{ name: 'boards-view' }">BCIMIAMI</router-link>
        <base-button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarHeader"
          aria-controls="navbarHeader" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </base-button>

        <div class="collapse navbar-collapse" id="navbarHeader">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
              <router-link data-test-id="boards" class="nav-link" :to="{ name: 'boards-view' }">{{ $t('header.menu.boards') }}<span
                  class="sr-only">(current)</span>
              </router-link>
            </li>
          </ul>
          <form class="form-inline my-2 my-lg-0">
            <input class="form-control mr-sm-2" type="search" :placeholder="$t('header.menu.search')" :aria-label="$t('header.menu.search')">
            <base-button class="btn btn-outline-success my-2 my-sm-0" type="submit">{{ $t('header.menu.search') }}</base-button>
          </form>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'HeaderComponent',
  computed: {
    ...mapGetters(['getLangs']),
  },
  methods: {
    changeLanguage(language) {
      this.$root.$i18n.locale = language;
      localStorage.setItem('lang', this.$root.$i18n.locale);
    },
  },
};
</script>

<style scoped>
.langs img {
  width: 20px;
  height: 15px;
}
</style>
