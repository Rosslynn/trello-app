<template>
  <div class="dropdown drop-container">
    <base-button class="btn" type="button" data-toggle="dropdown" aria-expanded="false">
      <template #text>
        <base-icon name="more-vertical" class="custom-icon" color="white"></base-icon>
      </template>
    </base-button>
    <div class="dropdown-menu dropdown-menu-right">
      <button class="dropdown-item" type="button">Action</button>
      <button class="dropdown-item" type="button">Another action</button>
      <button class="dropdown-item" type="button">Something else here</button>
    </div>
  </div>
</template>

<style scoped>
.drop-container {
  position: absolute;
  top: 0;
  right: 0
}

.custom-icon {
  position: absolute;
  top: 4px;
  right: 0px;
}

button {
  height: 30px !important;
}
</style>
