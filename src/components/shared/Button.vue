<template>
  <button :class="classes" @click="onClick" :disabled="disabled" :type="type">
    {{ label }}
  </button>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: true,
    },
    classes: {
      type: String,
      default:
        "bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded",
    },
    onClick: {
      type: Function,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: "button",
    },
  },
};
</script>
