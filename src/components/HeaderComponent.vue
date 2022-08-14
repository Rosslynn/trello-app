<!-- eslint-disable max-len -->
<template>
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
            <router-link data-test-id="boards" class="nav-link" :to="{ name: 'boards-view' }">Boards <span class="sr-only">(current)</span>
            </router-link>
          </li>
        </ul>
        <form class="form-inline my-2 my-lg-0">
          <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
          <base-button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</base-button>
        </form>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'HeaderComponent',
};
</script>

<style>
</style>
