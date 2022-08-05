<!-- eslint-disable max-len -->
<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark px-5">
    <router-link class="navbar-brand" :to="{ name: 'boards-view' }">BCIMIAMI</router-link>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarHeader"
      aria-controls="navbarHeader" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarHeader">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <router-link class="nav-link" :to="{ name: 'boards-view' }">Boards <span class="sr-only">(current)</span></router-link>
        </li>
      </ul>
      <form class="form-inline my-2 my-lg-0">
        <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
        <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
      </form>
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
