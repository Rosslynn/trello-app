export default {
  inheritAttrs: false,
  props: {
    value: {
      type: [String, Number, Boolean],
    },
    label: {
      type: String,
      default: '',
    },
  },
  methods: {
    updateValue(e) {
      this.$emit('input', e.target.value);
    },
  },
  computed: {
    listeners() {
      return {
        ...this.$listeners,
        input: this.updateValue,
      };
    },
  },
};
