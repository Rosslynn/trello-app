<template>
  <div>
    hola mundo
  </div>
</template>

<script>
export default {
  name: 'EditBoardView',
  props: {
    id: {
      type: [Number, String],
      required: true,
    },
  },
};
</script>
