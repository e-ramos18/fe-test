<template>
  <div class="fixed inset-0 flex items-center justify-center z-50">
    <div class="absolute inset-0 bg-gray-800 opacity-50"></div>
    <div class="bg-white rounded-lg shadow-lg p-6 relative">
      <span
        @click="$emit('close')"
        class="absolute top-2 right-2 text-gray-500 hover:text-gray-700 cursor-pointer"
      >
        <svg
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          ></path>
        </svg>
      </span>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "Modal",
  mounted() {
    document.body.classList.add("overflow-hidden");
  },
  beforeDestroy() {
    document.body.classList.remove("overflow-hidden");
  },
};
</script>
